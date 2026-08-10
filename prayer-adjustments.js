"use strict";

/*
========================================
   IQRANIX — PRAYER TIME ADJUSTMENTS
========================================
*/

const STORAGE_KEY = "iqranixPrayerAdjustments";

const PRAYERS = [
    "fajr",
    "sunrise",
    "dhuhr",
    "asr",
    "maghrib",
    "isha"
];

const DEFAULT_VALUES = {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0
};

let adjustments = {
    ...DEFAULT_VALUES
};


/*
========================================
   LOAD SAVED VALUES
========================================
*/

function loadAdjustments() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        const parsed =
            JSON.parse(saved);

        PRAYERS.forEach(function (prayer) {

            const value =
                Number(parsed[prayer]);

            if (
                Number.isFinite(value) &&
                value >= -30 &&
                value <= 30
            ) {

                adjustments[prayer] = Math.trunc(value);

            }

        });

    } catch (error) {

        console.error(
            "Iqranix: Could not load prayer adjustments.",
            error
        );

    }

}


/*
========================================
   SAVE VALUES
========================================
*/

function saveAdjustments() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(adjustments)
        );

        return true;

    } catch (error) {

        console.error(
            "Iqranix: Could not save prayer adjustments.",
            error
        );

        return false;

    }

}


/*
========================================
   UPDATE ONE DISPLAY
========================================
*/

function updateDisplay(prayer) {

    const element =
        document.getElementById(
            prayer + "Value"
        );

    if (!element) {
        return;
    }

    const value =
        adjustments[prayer];

    element.textContent =
        (value >= 0 ? "+" : "") +
        value +
        " min";

}


/*
========================================
   UPDATE ALL DISPLAYS
========================================
*/

function updateAllDisplays() {

    PRAYERS.forEach(function (prayer) {

        updateDisplay(prayer);

    });

}


/*
========================================
   INCREASE ADJUSTMENT
========================================
*/

function increasePrayer(prayer) {

    if (!PRAYERS.includes(prayer)) {
        return;
    }

    if (adjustments[prayer] >= 30) {
        return;
    }

    adjustments[prayer] += 1;

    updateDisplay(prayer);

}


/*
========================================
   DECREASE ADJUSTMENT
========================================
*/

function decreasePrayer(prayer) {

    if (!PRAYERS.includes(prayer)) {
        return;
    }

    if (adjustments[prayer] <= -30) {
        return;
    }

    adjustments[prayer] -= 1;

    updateDisplay(prayer);

}


/*
========================================
   SET UP PLUS BUTTONS
========================================
*/

function setupPlusButtons() {

    const buttons =
        document.querySelectorAll(".plus");

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const prayer =
                    button.getAttribute(
                        "data-prayer"
                    );

                increasePrayer(prayer);

            }
        );

    });

}


/*
========================================
   SET UP MINUS BUTTONS
========================================
*/

function setupMinusButtons() {

    const buttons =
        document.querySelectorAll(".minus");

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const prayer =
                    button.getAttribute(
                        "data-prayer"
                    );

                decreasePrayer(prayer);

            }
        );

    });

}


/*
========================================
   SAVE BUTTON
========================================
*/

function setupSaveButton() {

    const button =
        document.getElementById(
            "saveAdjustments"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const success =
                saveAdjustments();

            if (success) {

                alert(
                    "✅ Prayer adjustments saved successfully."
                );

            } else {

                alert(
                    "❌ Unable to save prayer adjustments."
                );

            }

        }
    );

}


/*
========================================
   RESET BUTTON
========================================
*/

function setupResetButton() {

    const button =
        document.getElementById(
            "resetAdjustments"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            adjustments = {
                ...DEFAULT_VALUES
            };

            updateAllDisplays();

            saveAdjustments();

            alert(
                "🔄 Prayer adjustments reset to default."
            );

        }
    );

}


/*
========================================
   INITIALIZE PAGE
========================================
*/

function initializePrayerAdjustments() {

    loadAdjustments();

    updateAllDisplays();

    setupPlusButtons();

    setupMinusButtons();

    setupSaveButton();

    setupResetButton();

    console.log(
        "✅ Iqranix Prayer Adjustments ready."
    );

}


/*
========================================
   START
========================================
*/

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePrayerAdjustments
    );

} else {

    initializePrayerAdjustments();

}