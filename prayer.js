/*==================================
  IQRANIX - PRAYER.JS (PART 1)
==================================*/

"use strict";

/*==========================
  ELEMENTS
==========================*/

const city = document.getElementById("city");
const country = document.getElementById("country");

const gregorianDate = document.getElementById("gregorianDate");
const hijriDate = document.getElementById("hijriDate");

const nextPrayer = document.getElementById("nextPrayer");
const countdown = document.getElementById("countdown");

const progressBar = document.getElementById("progressBar");

const refreshBtn = document.getElementById("refreshBtn");

const fajrTime = document.getElementById("fajrTime");
const sunriseTime = document.getElementById("sunriseTime");
const dhuhrTime = document.getElementById("dhuhrTime");
const asrTime = document.getElementById("asrTime");
const maghribTime = document.getElementById("maghribTime");
const ishaTime = document.getElementById("ishaTime");

/*==========================
  VARIABLES
==========================*/

let latitude = null;
let longitude = null;

let prayerTimes = {};
let countdownTimer = null;

/*==========================
  START
==========================*/

document.addEventListener("DOMContentLoaded", () => {

    getLocation();

});

refreshBtn.addEventListener("click", () => {

    getLocation();

});

/*==========================
  LOCATION
==========================*/

function getLocation() {

    if (!navigator.geolocation) {

        city.textContent = "Location Unsupported";
        return;

    }

    navigator.geolocation.getCurrentPosition(

        onLocationSuccess,

        onLocationError,

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}

function onLocationSuccess(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    loadLocation();
    loadPrayerTimes();

}

function onLocationError() {

    city.textContent = "Location Disabled";
    country.textContent = "Enable GPS";

}

/*==========================
  REVERSE GEOCODING
==========================*/

async function loadLocation() {

    try {

        const response = await fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        city.textContent =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

        country.textContent =
            data.address.country || "";

    } catch (error) {

        console.error(error);

        city.textContent = "Unknown";
        country.textContent = "";

    }

}/*==================================
  LOAD PRAYER TIMES
==================================*/

async function loadPrayerTimes() {

    try {

        const response = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );

        const result = await response.json();

        prayerTimes = result.data.timings;
       window.iqranixPrayerTimes = prayerTimes;
        fajrTime.textContent = prayerTimes.Fajr;
        sunriseTime.textContent = prayerTimes.Sunrise;
        dhuhrTime.textContent = prayerTimes.Dhuhr;
        asrTime.textContent = prayerTimes.Asr;
        maghribTime.textContent = prayerTimes.Maghrib;
        ishaTime.textContent = prayerTimes.Isha;

        gregorianDate.textContent =
            result.data.date.readable;

        hijriDate.textContent =
            result.data.date.hijri.day + " " +
            result.data.date.hijri.month.en + " " +
            result.data.date.hijri.year + " AH";

        determineNextPrayer();

        highlightCurrentPrayer();

    } catch (error) {

        console.error("Prayer API Error:", error);

    }

}

/*==================================
  NEXT PRAYER
==================================*/

function determineNextPrayer() {

    const prayers = [

        { name: "Fajr", time: prayerTimes.Fajr },

        { name: "Dhuhr", time: prayerTimes.Dhuhr },

        { name: "Asr", time: prayerTimes.Asr },

        { name: "Maghrib", time: prayerTimes.Maghrib },

        { name: "Isha", time: prayerTimes.Isha }

    ];

    const now = new Date();

    let next = null;

    for (const prayer of prayers) {

        const parts = prayer.time.split(":");

        const prayerDate = new Date();

        prayerDate.setHours(
            Number(parts[0]),
            Number(parts[1]),
            0,
            0
        );

        if (prayerDate > now) {

            next = {

                name: prayer.name,

                date: prayerDate

            };

            break;

        }

    }

    if (!next) {

        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);

        tomorrow.setHours(5, 0, 0, 0);

        next = {

            name: "Fajr",

            date: tomorrow

        };

    }

    nextPrayer.textContent = next.name;

    startCountdown(next.date);

}

/*==================================
  HIGHLIGHT CURRENT PRAYER
==================================*/

function highlightCurrentPrayer() {

    const cards = document.querySelectorAll(".prayer-card");

    cards.forEach(card => {

        card.classList.remove("active");

    });

    const currentHour = new Date().getHours();

    let index = 0;

    if (currentHour >= 5 && currentHour < 12) {

        index = 0;

    } else if (currentHour >= 12 && currentHour < 15) {

        index = 2;

    } else if (currentHour >= 15 && currentHour < 18) {

        index = 3;

    } else if (currentHour >= 18 && currentHour < 19) {

        index = 4;

    } else {

        index = 5;

    }

    if (cards[index]) {

cards[index].classList.add("active");
    }

}/*==================================
  COUNTDOWN TIMER
==================================*/

function startCountdown(targetTime) {

    if (countdownTimer) {

        clearInterval(countdownTimer);

    }

    function updateCountdown() {

        const now = new Date();

        let difference = targetTime - now;

        if (difference <= 0) {

            clearInterval(countdownTimer);

            loadPrayerTimes();

            return;

        }

        const hours = Math.floor(difference / (1000 * 60 * 60));

        difference %= (1000 * 60 * 60);

        const minutes = Math.floor(difference / (1000 * 60));

        countdown.textContent = `${hours}h ${minutes}m`;

        const totalHours = 24;

        const remainingHours = hours + (minutes / 60);

        const percentage =
            ((totalHours - remainingHours) / totalHours) * 100;

        progressBar.style.width =
            Math.min(Math.max(percentage, 0), 100) + "%";

    }

    updateCountdown();

    countdownTimer = setInterval(updateCountdown, 60000);

}

/*==================================
  TODAY'S DATE
==================================*/

function updateCurrentDate() {

    const today = new Date();

    gregorianDate.textContent =
        today.toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

updateCurrentDate();

/*==================================
  AUTO REFRESH
==================================*/

setInterval(() => {

    loadPrayerTimes();

}, 600000);

/*==================================
  PAGE READY
==================================*/

window.addEventListener("load", () => {

    console.log("Iqranix Prayer Page Loaded");

});