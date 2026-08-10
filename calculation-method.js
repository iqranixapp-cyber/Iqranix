/* =========================================
   IQRANIX
   PRAYER CALCULATION METHOD
   ========================================= */

"use strict";


/* =========================================
   STORAGE
   ========================================= */

const STORAGE_KEY = "iqranixPrayerCalculationMethod";


/* =========================================
   DEFAULT METHOD
   ========================================= */

const DEFAULT_METHOD = "MWL";


/* =========================================
   METHOD NAMES
   ========================================= */

const METHOD_NAMES = {

    MWL:
        "Muslim World League",

    ISNA:
        "Islamic Society of North America",

    Egypt:
        "Egyptian General Authority of Survey",

    Makkah:
        "Umm Al-Qura University, Makkah",

    Karachi:
        "University of Islamic Sciences, Karachi",

    Tehran:
        "Institute of Geophysics, University of Tehran",

    JAKIM:
        "JAKIM",

    Gulf:
        "Gulf Region",

    Custom:
        "Custom"

};


/* =========================================
   GET ELEMENTS
   ========================================= */

function getMethodSelect() {

    return document.getElementById(
        "calculationMethod"
    );

}


function getCurrentMethodText() {

    return document.getElementById(
        "currentMethodText"
    );

}


/* =========================================
   LOAD METHOD
   ========================================= */

function loadCalculationMethod() {

    const select =
        getMethodSelect();

    const currentText =
        getCurrentMethodText();

    if (!select) {

        console.error(
            "Calculation method select not found."
        );

        return;

    }


    let savedMethod =
        localStorage.getItem(
            STORAGE_KEY
        );


    /* Check that saved method exists */

    if (
        !savedMethod ||
        !Object.prototype.hasOwnProperty.call(
            METHOD_NAMES,
            savedMethod
        )
    ) {

        savedMethod =
            DEFAULT_METHOD;

    }


    select.value =
        savedMethod;


    if (currentText) {

        currentText.textContent =
            METHOD_NAMES[savedMethod];

    }

}


/* =========================================
   UPDATE DISPLAY
   ========================================= */

function updateCurrentMethod() {

    const select =
        getMethodSelect();

    const currentText =
        getCurrentMethodText();


    if (!select || !currentText) {

        return;

    }


    const method =
        select.value;


    currentText.textContent =
        METHOD_NAMES[method] ||
        "Muslim World League";

}


/* =========================================
   SAVE METHOD
   ========================================= */

function saveCalculationMethod() {

    const select =
        getMethodSelect();


    if (!select) {

        alert(
            "Prayer calculation method selector was not found."
        );

        return;

    }


    const method =
        select.value;


    localStorage.setItem(
        STORAGE_KEY,
        method
    );


    updateCurrentMethod();


    alert(
        "Prayer calculation method saved successfully."
    );


    console.log(
        "Saved prayer calculation method:",
        method
    );

}


/* =========================================
   RESET METHOD
   ========================================= */

function resetCalculationMethod() {

    const select =
        getMethodSelect();


    if (!select) {

        return;

    }


    select.value =
        DEFAULT_METHOD;


    localStorage.setItem(
        STORAGE_KEY,
        DEFAULT_METHOD
    );


    updateCurrentMethod();


    alert(
        "Prayer calculation method reset to Muslim World League."
    );


    console.log(
        "Prayer calculation method reset."
    );

}


/* =========================================
   SELECT CHANGE
   ========================================= */

function setupMethodSelector() {

    const select =
        getMethodSelect();


    if (!select) {

        console.error(
            "Element #calculationMethod was not found."
        );

        return;

    }


    select.addEventListener(
        "change",
        function () {

            updateCurrentMethod();

        }
    );

}


/* =========================================
   SAVE BUTTON
   ========================================= */

function setupSaveButton() {

    const button =
        document.getElementById(
            "saveMethod"
        );


    if (!button) {

        console.error(
            "Element #saveMethod was not found."
        );

        return;

    }


    button.addEventListener(
        "click",
        function () {

            saveCalculationMethod();

        }
    );

}


/* =========================================
   RESET BUTTON
   ========================================= */

function setupResetButton() {

    const button =
        document.getElementById(
            "resetMethod"
        );


    if (!button) {

        console.error(
            "Element #resetMethod was not found."
        );

        return;

    }


    button.addEventListener(
        "click",
        function () {

            resetCalculationMethod();

        }
    );

}


/* =========================================
   GET SAVED METHOD
   ========================================= */

function getPrayerCalculationMethod() {

    const savedMethod =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (
        savedMethod &&
        Object.prototype.hasOwnProperty.call(
            METHOD_NAMES,
            savedMethod
        )
    ) {

        return savedMethod;

    }


    return DEFAULT_METHOD;

}


/* =========================================
   START
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Iqranix Prayer Calculation Method loaded."
        );


        loadCalculationMethod();

        setupMethodSelector();

        setupSaveButton();

        setupResetButton();

    }
);