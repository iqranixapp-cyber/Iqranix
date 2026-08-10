/* =========================================================
   IQRANIX WELCOME SCREEN
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const checkbox = document.getElementById("terms-checkbox");
    const continueButton = document.getElementById("continue-button");

    /*
     * IMPORTANT:
     * This must match the actual filename of your home page.
     *
     * Your current file is:
     * Index.html
     *
     * So we use:
     * Index.html
     */

    const HOME_PAGE = "index.html";

    const TERMS_ACCEPTED_KEY = "iqranix_terms_accepted";


    /* =====================================================
       CHECK EXISTING ACCEPTANCE
       ===================================================== */

    const termsAccepted =
        localStorage.getItem(TERMS_ACCEPTED_KEY);


    /*
     * If the user already accepted the terms,
     * allow them to continue.
     */

    if (termsAccepted === "true") {

        continueButton.disabled = false;

        checkbox.checked = true;

    }


    /* =====================================================
       CHECKBOX
       ===================================================== */

    checkbox.addEventListener("change", function () {

        continueButton.disabled = !checkbox.checked;

    });


    /* =====================================================
       ACCEPT & CONTINUE
       ===================================================== */

    continueButton.addEventListener("click", function () {

        /*
         * Safety check.
         */

        if (!checkbox.checked) {

            return;

        }


        /*
         * Save acceptance on this device.
         */

        localStorage.setItem(
            TERMS_ACCEPTED_KEY,
            "true"
        );


        /*
         * Small visual feedback.
         */

        continueButton.disabled = true;

        continueButton.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>' +
            '<span>Opening IQRANIX...</span>';


        /*
         * Open the home page.
         *
         * IMPORTANT:
         * Because index.html is in the SAME folder
         * as welcome.html, this path is simply:
         *
         * index.html
         */

        setTimeout(function () {

            window.location.href = HOME_PAGE;

        }, 500);

    });


});
