/* =========================================================
   IQRANIX — NEARBY MOSQUES
   mosques.js
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    console.log("IQRANIX Nearby Mosques loaded.");

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const mosqueList =
        document.getElementById("mosque-list");

    const locationStatus =
        document.getElementById("location-status");

    const loadingMessage =
        document.getElementById("loading-message");

    const errorMessage =
        document.getElementById("error-message");

    const searchInput =
        document.getElementById("mosque-search");

    const radiusSelect =
        document.getElementById("mosque-radius");


    /* =====================================================
       VARIABLES
       ===================================================== */

    let userLatitude = null;
    let userLongitude = null;

    let mosques = [];

    let selectedRadius = 5000;


    /* =====================================================
       CHECK REQUIRED ELEMENTS
       ===================================================== */

    if (!mosqueList) {
        console.warn(
            "IQRANIX: #mosque-list was not found."
        );
    }


    /* =====================================================
       LOCATION
       ===================================================== */

    function getUserLocation() {

        if (!navigator.geolocation) {

            showError(
                "Location services are not supported by this device."
            );

            return;
        }

        setLoading(true);

        if (locationStatus) {
            locationStatus.textContent =
                "Requesting your location...";
        }

        navigator.geolocation.getCurrentPosition(

            position => {

                userLatitude =
                    position.coords.latitude;

                userLongitude =
                    position.coords.longitude;

                console.log(
                    "Location:",
                    userLatitude,
                    userLongitude
                );

                if (locationStatus) {
                    locationStatus.textContent =
                        "Location detected.";
                }

                findNearbyMosques();

            },

            error => {

                console.error(
                    "Location error:",
                    error
                );

                setLoading(false);

                showError(
                    "We couldn't access your location. " +
                    "Please allow location permission and try again."
                );

            },

            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000
            }

        );
    }


    /* =====================================================
       FIND NEARBY MOSQUES
       ===================================================== */

    async function findNearbyMosques() {

        if (
            userLatitude === null ||
            userLongitude === null
        ) {
            return;
        }

        setLoading(true);

        hideError();

        if (locationStatus) {
            locationStatus.textContent =
                "Finding nearby mosques...";
        }

        /*
         * OpenStreetMap Overpass API
         *
         * This searches for places tagged as:
         * amenity=place_of_worship
         * religion=muslim
         */

        const query = `
            [out:json][timeout:25];

            (
                node[
                    amenity=place_of_worship
                ][religion=muslim]
                (around:${selectedRadius},
                ${userLatitude},
                ${userLongitude});

                way[
                    amenity=place_of_worship
                ][religion=muslim]
                (around:${selectedRadius},
                ${userLatitude},
                ${userLongitude});

                relation[
                    amenity=place_of_worship
                ][religion=muslim]
                (around:${selectedRadius},
                ${userLatitude},
                ${userLongitude});
            );

            out center tags;
        `;

        const url =
            "https://overpass-api.de/api/interpreter?data=" +
            encodeURIComponent(query);

        try {

            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error(
                    "Mosque service returned an error."
                );
            }

            const data =
                await response.json();

            mosques =
                processMosqueData(data.elements || []);

            console.log(
                "Mosques found:",
                mosques.length
            );

            setLoading(false);

            if (locationStatus) {
                locationStatus.textContent =
                    mosques.length
                        ? `${mosques.length} mosque(s) found nearby.`
                        : "No nearby mosques found.";
            }

            displayMosques(mosques);

        } catch (error) {

            console.error(
                "Mosque search failed:",
                error
            );

            setLoading(false);

            showError(
                "Unable to load nearby mosques right now. " +
                "Please check your internet connection and try again."
            );
        }
    }


    /* =====================================================
       PROCESS MOSQUE DATA
       ===================================================== */

    function processMosqueData(elements) {

        return elements.map(element => {

            const latitude =
                element.lat ??
                element.center?.lat;

            const longitude =
                element.lon ??
                element.center?.lon;

            const tags =
                element.tags || {};

            const name =
                tags.name ||
                tags["name:en"] ||
                "Unnamed Mosque";

            const distance =
                calculateDistance(
                    userLatitude,
                    userLongitude,
                    latitude,
                    longitude
                );

            return {

                id: element.id,

                name: name,

                latitude: latitude,

                longitude: longitude,

                distance: distance,

                address:
                    tags["addr:street"] ||
                    tags["addr:place"] ||
                    tags["addr:city"] ||
                    "Address unavailable",

                phone:
                    tags.phone ||
                    tags["contact:phone"] ||
                    "",

                website:
                    tags.website ||
                    tags["contact:website"] ||
                    "",

                openingHours:
                    tags.opening_hours ||
                    ""

            };

        })

        .filter(mosque =>
            mosque.latitude !== undefined &&
            mosque.longitude !== undefined
        )

        .sort(
            (a, b) =>
                a.distance - b.distance
        );

    }


    /* =====================================================
       DISTANCE CALCULATION
       ===================================================== */

    function calculateDistance(
        lat1,
        lon1,
        lat2,
        lon2
    ) {

        const earthRadius = 6371000;

        const lat1Rad =
            lat1 * Math.PI / 180;

        const lat2Rad =
            lat2 * Math.PI / 180;

        const deltaLat =
            (lat2 - lat1) *
            Math.PI / 180;

        const deltaLon =
            (lon2 - lon1) *
            Math.PI / 180;

        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin(deltaLon / 2) ** 2;

        const c =
            2 *
            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );

        return earthRadius * c;
    }


    /* =====================================================
       FORMAT DISTANCE
       ===================================================== */

    function formatDistance(meters) {

        if (meters < 1000) {

            return `${Math.round(meters)} m`;

        }

        return `${(
            meters / 1000
        ).toFixed(1)} km`;
    }


    /* =====================================================
       DISPLAY MOSQUES
       ===================================================== */

    function displayMosques(list) {

        if (!mosqueList) {
            return;
        }

        mosqueList.innerHTML = "";

        if (!list.length) {

            mosqueList.innerHTML = `
                <div class="no-mosques">
                    <i class="fa-solid fa-mosque"></i>

                    <h3>
                        No mosques found
                    </h3>

                    <p>
                        Try increasing the search radius
                        or check your location.
                    </p>
                </div>
            `;

            return;
        }

        list.forEach(mosque => {

            const card =
                document.createElement("article");

            card.className =
                "mosque-result-card";

            card.innerHTML = `

                <div class="mosque-result-icon">
                    <i class="fa-solid fa-mosque"></i>
                </div>

                <div class="mosque-result-content">

                    <h3>
                        ${escapeHTML(mosque.name)}
                    </h3>

                    <p class="mosque-distance">
                        <i class="fa-solid fa-location-dot"></i>
                        ${formatDistance(mosque.distance)}
                    </p>

                    <p class="mosque-address">
                        ${escapeHTML(mosque.address)}
                    </p>

                    <div class="mosque-actions">

                        <button
                            class="directions-button"
                            data-lat="${mosque.latitude}"
                            data-lon="${mosque.longitude}">

                            <i class="fa-solid fa-route"></i>
                            Directions

                        </button>

                    </div>

                </div>

            `;

            mosqueList.appendChild(card);

        });

        attachDirectionButtons();
    }


    /* =====================================================
       DIRECTIONS
       ===================================================== */

    function attachDirectionButtons() {

        const buttons =
            document.querySelectorAll(
                ".directions-button"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const lat =
                        button.dataset.lat;

                    const lon =
                        button.dataset.lon;

                    const mapsURL =
                        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;

                    window.open(
                        mapsURL,
                        "_blank"
                    );

                }
            );

        });

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const search =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                const filtered =
                    mosques.filter(
                        mosque =>
                            mosque.name
                                .toLowerCase()
                                .includes(search) ||
                            mosque.address
                                .toLowerCase()
                                .includes(search)
                    );

                displayMosques(filtered);

            }
        );

    }


    /* =====================================================
       RADIUS
       ===================================================== */

    if (radiusSelect) {

        radiusSelect.addEventListener(
            "change",
            () => {

                selectedRadius =
                    Number(radiusSelect.value);

                if (
                    userLatitude !== null &&
                    userLongitude !== null
                ) {
                    findNearbyMosques();
                }

            }
        );

    }


    /* =====================================================
       LOADING
       ===================================================== */

    function setLoading(isLoading) {

        if (loadingMessage) {

            loadingMessage.style.display =
                isLoading
                    ? "block"
                    : "none";
        }

    }


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!errorMessage) {
            return;
        }

        errorMessage.textContent =
            message;

        errorMessage.style.display =
            "block";
    }


    function hideError() {

        if (!errorMessage) {
            return;
        }

        errorMessage.style.display =
            "none";
    }


    /* =====================================================
       HTML SAFETY
       ===================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       START
       ===================================================== */

    getUserLocation();

});