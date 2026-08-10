/* =========================================================
   IQRANIX — HOME PAGE JAVASCRIPT
   Connects the home cards to the existing HTML files.
   All pages are in the same folder.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       PAGE NAVIGATION
       ----------------------------------------------------- */

    const pages = {
        "quran.html": "quran.html",
        "prayer.html": "prayer.html",
        "duas.html": "duas.html",
        "qibla-calibration.html": "qibla-calibration.html",
        "tasbih.html": "tasbih.html",
        "mosques.html": "mosques.html",
        "articles.html": "articles.html",
        "reminders.html": "reminders.html",
        "bookmarks.html": "bookmarks.html",
        "settings.html": "settings.html",

        /* Knowledge */
        "prophets.html": "prophets.html",
        "seerah.html": "seerah.html",
        "fiqh.html": "fiqh.html",

        /* Media */
        "nasheeds.html": "nasheeds.html",
        "wallpapers.html": "wallpapers.html",
        "ringtones.html": "ringtones.html",

        /* Support */
        "support.html": "support.html"
    };


    /* -----------------------------------------------------
       OPEN PAGE FUNCTION
       ----------------------------------------------------- */

    function openPage(page) {

        if (!page) return;

        if (pages[page]) {
            window.location.href = pages[page];
        } else {
            console.warn("IQRANIX: Page not found:", page);
        }
    }


    /* -----------------------------------------------------
       CARDS WITH data-page
       
       Example:
       <div class="feature-card" data-page="quran.html">
       ----------------------------------------------------- */

    const clickableCards = document.querySelectorAll(
        "[data-page]"
    );

    clickableCards.forEach(card => {

        const page = card.getAttribute("data-page");

        if (!page) return;

        card.addEventListener("click", () => {
            openPage(page);
        });

        /* Accessibility */
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openPage(page);
            }

        });

    });


    /* -----------------------------------------------------
       ARROW BUTTONS
       
       If a card contains:
       
       <button data-page="quran.html">
          →
       </button>
       
       the arrow will work independently.
       ----------------------------------------------------- */

    const pageButtons = document.querySelectorAll(
        "button[data-page], a[data-page]"
    );

    pageButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const page = button.getAttribute("data-page");

            openPage(page);

        });

    });


    /* -----------------------------------------------------
       SETTINGS BUTTON
       ----------------------------------------------------- */

    const settingsButtons = document.querySelectorAll(
        "#settingsButton, .settings-button, [data-settings]"
    );

    settingsButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href = "settings.html";

        });

    });


    /* -----------------------------------------------------
       PRAYER TIMES FEATURE
       ----------------------------------------------------- */

    const prayerButtons = document.querySelectorAll(
        "#prayerCard, .prayer-card, [data-prayer]"
    );

    prayerButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href = "prayer.html";

        });

    });


    /* -----------------------------------------------------
       QURAN FEATURE
       ----------------------------------------------------- */

    const quranButtons = document.querySelectorAll(
        "#quranCard, .quran-card, [data-quran]"
    );

    quranButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href = "quran.html";

        });

    });


    /* -----------------------------------------------------
       TASBIH
       ----------------------------------------------------- */

    const tasbihButtons = document.querySelectorAll(
        "#tasbihCard, .tasbih-card, [data-tasbih]"
    );

    tasbihButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href = "tasbih.html";

        });

    });


    /* -----------------------------------------------------
       QIBLA
       ----------------------------------------------------- */

    const qiblaButtons = document.querySelectorAll(
        "#qiblaCard, .qibla-card, [data-qibla]"
    );

    qiblaButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href = "qibla-calibration.html";

        });

    });


    /* -----------------------------------------------------
       GENERIC CARD NAVIGATION
       
       This also allows us to connect cards by their IDs.
       ----------------------------------------------------- */

    const idConnections = {

        "prophetsCard": "prophets.html",
        "seerahCard": "seerah.html",
        "fiqhCard": "fiqh.html",

        "nasheedsCard": "nasheeds.html",
        "wallpapersCard": "wallpapers.html",
        "ringtonesCard": "ringtones.html",

        "mosquesCard": "mosques.html",
        "articlesCard": "articles.html",
        "remindersCard": "reminders.html",
        "bookmarksCard": "bookmarks.html",

        "supportCard": "support.html"

    };


    Object.keys(idConnections).forEach(id => {

        const element = document.getElementById(id);

        if (!element) return;

        element.addEventListener("click", () => {

            window.location.href = idConnections[id];

        });

    });


    /* -----------------------------------------------------
       SUPPORT IQRANIX
       ----------------------------------------------------- */

    const supportButtons = document.querySelectorAll(
        "#supportCard, .support-card, [data-support]"
    );

    supportButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            window.location.href = "support.html";

        });

    });


    /* -----------------------------------------------------
       PREVENT BROKEN LINKS
       ----------------------------------------------------- */

    document.querySelectorAll("a[href='#']").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


    /* -----------------------------------------------------
       CONSOLE MESSAGE
       ----------------------------------------------------- */

    console.log(
        "IQRANIX Home loaded successfully."
    );

});