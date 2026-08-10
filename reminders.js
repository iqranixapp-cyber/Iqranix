/* =========================================================
   IQRANIX — DAILY REMINDERS
   reminders.js
   Part 1 — Core Setup & Reminder Data
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const REMINDERS_STORAGE_KEY = "iqranix_daily_reminders";


/* =========================================================
   DEFAULT REMINDERS
   ========================================================= */

const DEFAULT_REMINDERS = [

    {
        id: "morning-dhikr",
        title: "Morning Dhikr",
        category: "Dhikr",
        text: "Remember Allah in the morning and begin your day with remembrance.",
        time: "06:00",
        enabled: true
    },

    {
        id: "quran",
        title: "Quran Time",
        category: "Quran",
        text: "Take some time to read and reflect upon the Qur'an.",
        time: "08:00",
        enabled: true
    },

    {
        id: "dhuhr",
        title: "Dhuhr Reminder",
        category: "Prayer",
        text: "Do not forget your Dhuhr prayer.",
        time: "13:00",
        enabled: true
    },

    {
        id: "asr",
        title: "Asr Reminder",
        category: "Prayer",
        text: "Prepare for and remember your Asr prayer.",
        time: "16:00",
        enabled: true
    },

    {
        id: "evening-dhikr",
        title: "Evening Dhikr",
        category: "Dhikr",
        text: "Spend a moment remembering Allah in the evening.",
        time: "18:30",
        enabled: true
    },

    {
        id: "maghrib",
        title: "Maghrib Reminder",
        category: "Prayer",
        text: "Remember your Maghrib prayer.",
        time: "19:00",
        enabled: true
    },

    {
        id: "isha",
        title: "Isha Reminder",
        category: "Prayer",
        text: "Complete your day with your Isha prayer.",
        time: "20:30",
        enabled: true
    },

    {
        id: "night-quran",
        title: "Night Quran",
        category: "Quran",
        text: "End your day with a little Qur'an and reflection.",
        time: "21:30",
        enabled: true
    }

];


/* =========================================================
   LOAD REMINDERS
   ========================================================= */

function loadReminders() {

    try {

        const saved =
            localStorage.getItem(REMINDERS_STORAGE_KEY);

        if (!saved) {

            return DEFAULT_REMINDERS.map(reminder => ({
                ...reminder
            }));

        }

        const parsed =
            JSON.parse(saved);

        if (!Array.isArray(parsed)) {

            return DEFAULT_REMINDERS.map(reminder => ({
                ...reminder
            }));

        }

        return parsed;

    } catch (error) {

        console.error(
            "IQRANIX: Unable to load reminders.",
            error
        );

        return DEFAULT_REMINDERS.map(reminder => ({
            ...reminder
        }));

    }

}


/* =========================================================
   SAVE REMINDERS
   ========================================================= */

function saveReminders(reminders) {

    try {

        localStorage.setItem(
            REMINDERS_STORAGE_KEY,
            JSON.stringify(reminders)
        );

        return true;

    } catch (error) {

        console.error(
            "IQRANIX: Unable to save reminders.",
            error
        );

        return false;

    }

}


/* =========================================================
   CURRENT REMINDERS
   ========================================================= */

let reminders = loadReminders();


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "IQRANIX Daily Reminders loaded."
        );

        console.log(
            "Reminders:",
            reminders
        );

    }
);