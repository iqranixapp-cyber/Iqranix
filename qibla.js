"use strict";

/*
=========================================================
IQRANIX — QIBLA COMPASS
=========================================================

Kaaba:
Latitude  = 21.422487
Longitude = 39.826206

The GPS position determines the true Qibla bearing.
The device orientation determines how the arrow should
appear relative to the phone.
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       KAABA
       ===================================================== */

    const KAABA_LAT = 21.422487;
    const KAABA_LON = 39.826206;


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const backButton =
        document.getElementById("backButton");

    const compass =
        document.getElementById("compass");

    const qiblaArrow =
        document.getElementById("qiblaArrow");

    const activateCompass =
        document.getElementById("activateCompass");

    const locationButton =
        document.getElementById("locationButton");

    const compassInstruction =
        document.getElementById("compassInstruction");

    const bearingValue =
        document.getElementById("bearingValue");

    const directionValue =
        document.getElementById("directionValue");

    const distanceValue =
        document.getElementById("distanceValue");

    const locationValue =
        document.getElementById("locationValue");

    const statusTitle =
        document.getElementById("statusTitle");

    const statusText =
        document.getElementById("statusText");

    const toast =
        document.getElementById("toast");


    /* =====================================================
       STATE
       ===================================================== */

    let latitude = null;

    let longitude = null;

    let qiblaBearing = null;

    let deviceHeading = null;

    let compassActive = false;


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(
            showToast.timer
        );

        showToast.timer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3000);

    }


    /* =====================================================
       NORMALIZE ANGLE
       ===================================================== */

    function normalize(angle) {

        return (
            (angle % 360) + 360
        ) % 360;

    }


    /* =====================================================
       QIBLA BEARING
       ===================================================== */

    function calculateQibla(
        lat,
        lon
    ) {

        const phi1 =
            lat * Math.PI / 180;

        const phi2 =
            KAABA_LAT *
            Math.PI / 180;

        const deltaLambda =
            (
                KAABA_LON -
                lon
            ) *
            Math.PI / 180;


        const y =
            Math.sin(deltaLambda) *
            Math.cos(phi2);


        const x =
            Math.cos(phi1) *
            Math.sin(phi2)

            -

            Math.sin(phi1) *
            Math.cos(phi2) *
            Math.cos(deltaLambda);


        return normalize(
            Math.atan2(y, x) *
            180 / Math.PI
        );

    }


    /* =====================================================
       DISTANCE
       ===================================================== */

    function calculateDistance(
        lat1,
        lon1,
        lat2,
        lon2
    ) {

        const R = 6371;

        const dLat =
            (lat2 - lat1) *
            Math.PI / 180;

        const dLon =
            (lon2 - lon1) *
            Math.PI / 180;

        const a =
            Math.sin(dLat / 2) ** 2 +

            Math.cos(
                lat1 * Math.PI / 180
            ) *

            Math.cos(
                lat2 * Math.PI / 180
            ) *

            Math.sin(dLon / 2) ** 2;


        return (
            R *
            2 *
            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            )
        );

    }


    /* =====================================================
       DIRECTION
       ===================================================== */

    function getDirection(
        bearing
    ) {

        const directions = [
            "N",
            "NE",
            "E",
            "SE",
            "S",
            "SW",
            "W",
            "NW"
        ];

        return directions[
            Math.round(
                bearing / 45
            ) % 8
        ];

    }


    /* =====================================================
       DISPLAY LOCATION
       ===================================================== */

    function updateLocationDisplay() {

        if (!locationValue) {
            return;
        }

        locationValue.textContent =
            `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;

    }


    /* =====================================================
       DISPLAY QIBLA
       ===================================================== */

    function updateQiblaDisplay() {

        if (
            latitude === null ||
            longitude === null
        ) {
            return;
        }


        qiblaBearing =
            calculateQibla(
                latitude,
                longitude
            );


        const distance =
            calculateDistance(
                latitude,
                longitude,
                KAABA_LAT,
                KAABA_LON
            );


        if (bearingValue) {

            bearingValue.textContent =
                `${Math.round(qiblaBearing)}°`;

        }


        if (directionValue) {

            directionValue.textContent =
                getDirection(
                    qiblaBearing
                );

        }


        if (distanceValue) {

            distanceValue.textContent =
                distance >= 1
                    ? `${distance.toFixed(0)} km`
                    : `${Math.round(distance * 1000)} m`;

        }


        if (compassInstruction) {

            compassInstruction.textContent =
                `Qibla bearing: ${Math.round(
                    qiblaBearing
                )}° from true north.`;

        }


        updateArrow();

    }


    /* =====================================================
       LOCATION SUCCESS
       ===================================================== */

    function locationSuccess(
        position
    ) {

        latitude =
            position.coords.latitude;

        longitude =
            position.coords.longitude;


        console.log(
            "IQRANIX GPS:",
            latitude,
            longitude
        );


        updateLocationDisplay();

        updateQiblaDisplay();


        if (statusTitle) {
            statusTitle.textContent =
                "Location found";
        }


        if (statusText) {
            statusText.textContent =
                "Your Qibla direction has been calculated.";
        }


        showToast(
            "Location found."
        );

    }


    /* =====================================================
       LOCATION ERROR
       ===================================================== */

    function locationError(
        error
    ) {

        console.error(
            "GPS error:",
            error
        );


        let message =
            "Unable to access your location.";


        if (
            error.code ===
            1
        ) {

            message =
                "Location permission was denied.";

        }

        else if (
            error.code ===
            2
        ) {

            message =
                "Your location is unavailable.";

        }

        else if (
            error.code ===
            3
        ) {

            message =
                "Location request timed out.";

        }


        if (locationValue) {

            locationValue.textContent =
                "Unavailable";

        }


        if (statusTitle) {

            statusTitle.textContent =
                "Location required";

        }


        if (statusText) {

            statusText.textContent =
                message;

        }


        showToast(message);

    }


    /* =====================================================
       GET GPS
       ===================================================== */

    function getLocation() {

        if (
            !navigator.geolocation
        ) {

            showToast(
                "GPS is not supported by this browser."
            );

            return;

        }


        if (statusTitle) {

            statusTitle.textContent =
                "Finding location...";

        }


        if (statusText) {

            statusText.textContent =
                "Please allow location access.";

        }


        if (locationValue) {

            locationValue.textContent =
                "Searching...";

        }


        navigator.geolocation.getCurrentPosition(
            locationSuccess,
            locationError,
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            }
        );

    }


    /* =====================================================
       SHORTEST ANGLE
       ===================================================== */

    function shortestDifference(
        target,
        current
    ) {

        return (
            (target - current + 540) %
            360
        ) - 180;

    }


    /* =====================================================
       UPDATE ARROW
       ===================================================== */

    function updateArrow() {

        if (
            !qiblaArrow ||
            qiblaBearing === null
        ) {
            return;
        }


        /*
         * If the phone has no orientation yet,
         * show the true Qibla bearing visually.
         */

        if (deviceHeading === null) {

            qiblaArrow.style.transform =
                `rotate(${qiblaBearing}deg)`;

            return;

        }


        /*
         * Calculate Qibla relative to
         * the phone's current heading.
         */

        const relative =
            shortestDifference(
                qiblaBearing,
                deviceHeading
            );


        qiblaArrow.style.transform =
            `rotate(${relative}deg)`;


        /*
         * Tell the user when aligned.
         */

        if (Math.abs(relative) <= 5) {

            if (statusTitle) {
                statusTitle.textContent =
                    "🕋 Qibla Found";
            }

            if (statusText) {
                statusText.textContent =
                    "You are facing the Qibla.";
            }

            if (compassInstruction) {
                compassInstruction.textContent =
                    "🕋 You are facing the Qibla.";
            }

        }

        else {

            if (statusTitle) {
                statusTitle.textContent =
                    "Turn your phone";
            }

            if (statusText) {

                statusText.textContent =
                    `Turn ${Math.round(
                        Math.abs(relative)
                    )}° ${
                        relative > 0
                            ? "right"
                            : "left"
                    } to face the Qibla.`;

            }

        }

    }


    /* =====================================================
       ORIENTATION EVENT
       ===================================================== */

    function orientationHandler(
        event
    ) {

        let heading = null;


        /*
         * iOS Safari
         */

        if (
            typeof event.webkitCompassHeading ===
            "number"
        ) {

            heading =
                event.webkitCompassHeading;

        }


        /*
         * Standard Android browsers
         */

        else if (
            typeof event.alpha ===
            "number"
        ) {

            heading =
                360 - event.alpha;

        }


        if (
            heading === null ||
            !Number.isFinite(heading)
        ) {

            return;

        }


        /*
         * Screen orientation
         */

        let screenAngle = 0;


        if (
            screen.orientation &&
            typeof screen.orientation.angle ===
            "number"
        ) {

            screenAngle =
                screen.orientation.angle;

        }


        deviceHeading =
            normalize(
                heading + screenAngle
            );


        updateArrow();

    }


    /* =====================================================
       ACTIVATE COMPASS
       ===================================================== */

    async function activateDeviceCompass() {

        if (
            !("DeviceOrientationEvent" in window)
        ) {

            showToast(
                "This device does not provide a compass sensor."
            );

            if (statusTitle) {
                statusTitle.textContent =
                    "Compass unavailable";
            }

            if (statusText) {
                statusText.textContent =
                    "Your phone/browser does not expose an orientation sensor.";
            }

            return;

        }


        /*
         * Some iPhones require permission.
         */

        if (
            typeof DeviceOrientationEvent.requestPermission ===
            "function"
        ) {

            try {

                const permission =
                    await DeviceOrientationEvent
                        .requestPermission();


                if (
                    permission !==
                    "granted"
                ) {

                    showToast(
                        "Compass permission was denied."
                    );

                    if (statusText) {
                        statusText.textContent =
                            "Please allow motion and orientation access.";
                    }

                    return;

                }

            }

            catch (error) {

                console.error(
                    error
                );

                showToast(
                    "Could not activate compass."
                );

                return;

            }

        }


        window.addEventListener(
            "deviceorientation",
            orientationHandler,
            true
        );


        compassActive = true;


        if (activateCompass) {

            activateCompass.textContent =
                "🧭 Compass Active";

        }


        if (compass) {

            compass.classList.add(
                "active"
            );

        }


        if (statusTitle) {

            statusTitle.textContent =
                "Compass active";

        }


        if (statusText) {

            statusText.textContent =
                "Hold your phone flat and slowly turn it.";

        }


        if (compassInstruction) {

            compassInstruction.textContent =
                "🧭 Slowly rotate your phone until the 🕋 arrow points ahead.";

        }


        showToast(
            "Compass activated."
        );


        /*
         * Make sure GPS is available.
         */

        if (
            latitude === null
        ) {

            getLocation();

        }

    }


    /* =====================================================
       BUTTONS
       ===================================================== */

    if (activateCompass) {

        activateCompass.addEventListener(
            "click",
            activateDeviceCompass
        );

    }


    if (locationButton) {

        locationButton.addEventListener(
            "click",
            getLocation
        );

    }


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                if (
                    window.history.length > 1
                ) {

                    window.history.back();

                }

                else {

                    window.location.href =
                        "index.html";

                }

            }
        );

    }


    /* =====================================================
       START GPS
       ===================================================== */

    getLocation();


    /* =====================================================
       SCREEN ROTATION
       ===================================================== */

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                updateArrow,
                300
            );

        }
    );


    console.log(
        "IQRANIX Qibla Compass ready."
    );

});