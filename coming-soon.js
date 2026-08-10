/* =====================================================
   IQRANIX — COMING SOON.JS
   ===================================================== */

"use strict";


document.addEventListener("DOMContentLoaded", () => {

    const title =
        document.getElementById("featureTitle");


    const params =
        new URLSearchParams(
            window.location.search
        );


    const feature =
        params.get("feature");


    if (!title) return;


    const features = {

        tafsir:
            "Tafsir Coming Soon",

        recitation:
            "AI Recitation Training Coming Soon",

        memorization:
            "Quran Memorization Coming Soon"

    };


    if (feature && features[feature]) {

        title.textContent =
            features[feature];

    }

});


/* =====================================================
   BACK BUTTON
   ===================================================== */

function goBack() {

    if (window.history.length > 1) {

        window.history.back();

    } else {

        window.location.href =
            "index.html";

    }

}