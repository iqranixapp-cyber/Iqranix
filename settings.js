"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const darkMode = document.getElementById("darkMode");
    const fontSize = document.getElementById("fontSize");
    const fontSizeStatus = document.getElementById("fontSizeStatus");
    const defaultReciter = document.getElementById("defaultReciter");
    const translationDefault = document.getElementById("translationDefault");
    const autoPlay = document.getElementById("autoPlay");

    /* =========================
       DARK MODE
    ========================= */

    const savedDarkMode =
        localStorage.getItem("iqranix_dark_mode");

    if (savedDarkMode !== null) {
        darkMode.checked = savedDarkMode === "true";
    }

    function applyDarkMode() {

        document.body.style.background =
            darkMode.checked ? "#081a18" : "#f5f8f7";

        document.body.style.color =
            darkMode.checked ? "#ffffff" : "#17201e";

        localStorage.setItem(
            "iqranix_dark_mode",
            darkMode.checked
        );
    }

    darkMode.addEventListener("change", applyDarkMode);

    applyDarkMode();


    /* =========================
       QURAN FONT SIZE
    ========================= */

    const savedFontSize =
        localStorage.getItem("iqranix_quran_font_size");

    if (savedFontSize) {
        fontSize.value = savedFontSize;
    }

    function saveFontSize() {

        localStorage.setItem(
            "iqranix_quran_font_size",
            fontSize.value
        );

        const names = {
            small: "Small",
            medium: "Medium",
            large: "Large",
            "extra-large": "Extra Large"
        };

        fontSizeStatus.textContent =
            "Current size: " + names[fontSize.value];
    }

    fontSize.addEventListener("change", saveFontSize);

    saveFontSize();


    /* =========================
       DEFAULT RECITER
    ========================= */

    const savedReciter =
        localStorage.getItem("iqranix_default_reciter");

    if (savedReciter) {

        for (let i = 0; i < defaultReciter.options.length; i++) {

            if (defaultReciter.options[i].text === savedReciter) {
                defaultReciter.selectedIndex = i;
                break;
            }

        }

    }

    defaultReciter.addEventListener("change", () => {

        localStorage.setItem(
            "iqranix_default_reciter",
            defaultReciter.value
        );

    });


    /* =========================
       TRANSLATION
    ========================= */

    const savedTranslation =
        localStorage.getItem("iqranix_translation_default");

    if (savedTranslation !== null) {

        translationDefault.checked =
            savedTranslation === "true";

    }

    translationDefault.addEventListener("change", () => {

        localStorage.setItem(
            "iqranix_translation_default",
            translationDefault.checked
        );

    });


    /* =========================
       AUTO PLAY
    ========================= */

    const savedAutoPlay =
        localStorage.getItem("iqranix_auto_play");

    if (savedAutoPlay !== null) {

        autoPlay.checked =
            savedAutoPlay === "true";

    }

    autoPlay.addEventListener("change", () => {

        localStorage.setItem(
            "iqranix_auto_play",
            autoPlay.checked
        );

    });


    /* =========================
       SHARE IQranix
    ========================= */

    const shareApp = document.getElementById("shareApp");

    if (shareApp) {

        shareApp.addEventListener("click", async () => {

            const shareData = {
                title: "Iqranix",
                text: "Read, listen, reflect and memorize with Iqranix.",
                url: window.location.origin
            };

            if (navigator.share) {

                try {
                    await navigator.share(shareData);
                } catch (error) {
                    // User cancelled sharing
                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        window.location.origin
                    );

                    alert("Iqranix link copied!");

                } catch (error) {

                    alert("Share is not supported on this device.");

                }

            }

        });

    }


    /* =========================
       RATE IQranix
    ========================= */

    const rateApp = document.getElementById("rateApp");

    if (rateApp) {

        rateApp.addEventListener("click", () => {

            alert(
                "Thank you for supporting Iqranix! ⭐\n\n" +
                "The Play Store rating page will be available here when the app is published."
            );

        });

    }


    /* =========================
       CHECK FOR UPDATES
    ========================= */

    const checkUpdates =
        document.getElementById("checkUpdates");

    if (checkUpdates) {

        checkUpdates.addEventListener("click", () => {

            checkUpdates.querySelector(".arrow").textContent = "✓";

            setTimeout(() => {

                checkUpdates.querySelector(".arrow").textContent = "›";

                alert("You're using the latest version of Iqranix.");

            }, 500);

        });

    }

});