"use strict";

/* =========================================
   IQRANIX QURAN READER — PART 1
   Quran loading + Arabic + translation
   + Font Size Settings
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const surahName =
    document.getElementById("surahName");

const surahArabic =
    document.getElementById("surahArabic");

const surahInfo =
    document.getElementById("surahInfo");

const versesContainer =
    document.getElementById("versesContainer");

const fontIncrease =
    document.getElementById("fontIncrease");

const fontDecrease =
    document.getElementById("fontDecrease");

const toggleTranslation =
    document.getElementById("toggleTranslation");


/* =========================================
   SETTINGS
========================================= */

const FONT_STORAGE_KEY =
    "iqranixQuranFontSize";

const FONT_SIZES = {
    small: 20,
    medium: 26,
    large: 32,
    "extra-large": 40
};


/* =========================================
   VARIABLES
========================================= */

let currentSurah =
    Number(
        localStorage.getItem(
            "iqranix_last_surah"
        )
    ) || 1;

let arabicFontSize =
    26;

let translationVisible =
    true;

let currentArabicAyahs =
    [];

let currentEnglishAyahs =
    [];


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadFontSizeSetting();

        loadSurah(currentSurah);

    }
);


/* =========================================
   LOAD SAVED FONT SIZE
========================================= */

function loadFontSizeSetting() {

    const saved =
        localStorage.getItem(
            FONT_STORAGE_KEY
        );

    if (
        saved &&
        FONT_SIZES[saved]
    ) {

        arabicFontSize =
            FONT_SIZES[saved];

    } else {

        arabicFontSize =
            FONT_SIZES.medium;

    }

}


/* =========================================
   SAVE FONT SIZE
========================================= */

function saveFontSizeSetting() {

    let setting = "medium";


    if (
        arabicFontSize <= 22
    ) {

        setting = "small";

    } else if (
        arabicFontSize <= 29
    ) {

        setting = "medium";

    } else if (
        arabicFontSize <= 36
    ) {

        setting = "large";

    } else {

        setting = "extra-large";

    }


    localStorage.setItem(
        FONT_STORAGE_KEY,
        setting
    );

}


/* =========================================
   LOAD SURAH
========================================= */

async function loadSurah(number) {

    currentSurah =
        Number(number);


    localStorage.setItem(
        "iqranix_last_surah",
        currentSurah
    );


    if (versesContainer) {

        versesContainer.innerHTML = `

            <div class="loading-card">

                <i class="fas fa-spinner fa-spin"></i>

                <p>Loading Surah...</p>

            </div>

        `;

    }


    try {

        const response =
            await fetch(
                `https://api.alquran.cloud/v1/surah/${currentSurah}/editions/quran-uthmani,en.asad`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to connect to Quran API."
            );

        }


        const data =
            await response.json();


        if (
            !data.data ||
            data.data.length < 2
        ) {

            throw new Error(
                "Invalid Quran data."
            );

        }


        currentArabicAyahs =
            data.data[0].ayahs || [];


        currentEnglishAyahs =
            data.data[1].ayahs || [];


        /* ================================
           SURAH INFORMATION
        ================================= */

        if (surahName) {

            surahName.textContent =
                data.data[0].englishName ||
                data.data[1].englishName ||
                "Quran";

        }


        if (surahArabic) {

            surahArabic.textContent =
                data.data[0].name ||
                "";

        }


        if (surahInfo) {

            surahInfo.textContent =
                `${currentArabicAyahs.length} Ayahs • ${data.data[0].revelationType || ""}`;

        }


        const numberElement =
            document.getElementById(
                "currentSurahNumber"
            );


        if (numberElement) {

            numberElement.textContent =
                currentSurah;

        }


        /* ================================
           DISPLAY
        ================================= */

        displayVerses();


    }

    catch (error) {

        console.error(
            "Quran loading error:",
            error
        );


        if (versesContainer) {

            versesContainer.innerHTML = `

                <div class="loading-card">

                    <i class="fas fa-exclamation-circle"></i>

                    <p>
                        Unable to load this Surah.
                    </p>

                    <button
                        id="retryQuran"
                        class="retry-button">

                        Try Again

                    </button>

                </div>

            `;


            const retry =
                document.getElementById(
                    "retryQuran"
                );


            if (retry) {

                retry.addEventListener(
                    "click",
                    function () {

                        loadSurah(
                            currentSurah
                        );

                    }
                );

            }

        }

    }

}


/* =========================================
   DISPLAY VERSES
========================================= */

function displayVerses() {

    if (!versesContainer) {
        return;
    }


    versesContainer.innerHTML =
        "";


    if (
        !currentArabicAyahs.length
    ) {

        versesContainer.innerHTML = `

            <div class="loading-card">

                <p>
                    No verses found.
                </p>

            </div>

        `;

        return;

    }


    currentArabicAyahs.forEach(
        function (ayah, index) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "ayah-card";


            const translation =
                currentEnglishAyahs[index]
                    ? currentEnglishAyahs[index].text
                    : "";


            card.innerHTML = `

                <div class="ayah-header">

                    <span class="ayah-number">

                        ${ayah.numberInSurah}

                    </span>

                </div>


                <p
                    class="ayah-arabic"
                    dir="rtl"
                    lang="ar"
                    style="
                        font-size:${arabicFontSize}px;
                    "
                >

                    ${ayah.text}

                </p>


                <p
                    class="ayah-translation"
                    ${
                        translationVisible
                        ? ""
                        : "style='display:none;'"
                    }
                >

                    ${translation}

                </p>

            `;


            versesContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================
   FONT SIZE — A+
========================================= */

if (fontIncrease) {

    fontIncrease.addEventListener(
        "click",
        function () {

            if (
                arabicFontSize < 40
            ) {

                arabicFontSize += 2;

            }


            saveFontSizeSetting();

            displayVerses();

        }
    );

}


/* =========================================
   FONT SIZE — A-
========================================= */

if (fontDecrease) {

    fontDecrease.addEventListener(
        "click",
        function () {

            if (
                arabicFontSize > 20
            ) {

                arabicFontSize -= 2;

            }


            saveFontSizeSetting();

            displayVerses();

        }
    );

}


/* =========================================
   TRANSLATION
========================================= */

if (toggleTranslation) {

    toggleTranslation.addEventListener(
        "click",
        function () {

            translationVisible =
                !translationVisible;


            displayVerses();

        }
    );

}


/* =========================================
   PREVIOUS SURAH
========================================= */

const previousSurah =
    document.getElementById(
        "previousSurah"
    );


if (previousSurah) {

    previousSurah.addEventListener(
        "click",
        function () {

            if (
                currentSurah > 1
            ) {

                loadSurah(
                    currentSurah - 1
                );

            }

        }
    );

}


/* =========================================
   NEXT SURAH
========================================= */

const nextSurah =
    document.getElementById(
        "nextSurah"
    );


if (nextSurah) {

    nextSurah.addEventListener(
        "click",
        function () {

            if (
                currentSurah < 114
            ) {

                loadSurah(
                    currentSurah + 1
                );

            }

        }
    );

}


/* =========================================
   DEBUG
========================================= */

console.log(
    "Iqranix Quran Reader Part 1 loaded."
);