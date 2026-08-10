"use strict";

/*
====================================================
        IQRANIX — QURAN.JS
====================================================

WORKING:
✓ Quran Surah list
✓ Arabic Quran reader
✓ Quran audio
✓ Multiple reciters
✓ Previous / Next Surah

COMING SOON:
• Translation & Tafsir
• AI Recitation Training
• Memorization / Hifz

====================================================
*/


/*==================================================
                    SETTINGS
==================================================*/

const API_BASE = "https://api.alquran.cloud/v1";

const STORAGE = {
    LAST_SURAH: "iqranix_last_surah",
    RECITER: "iqranix_reciter"
};


/*==================================================
                    VARIABLES
==================================================*/

let surahs = [];

let currentSurah =
    Number(
        localStorage.getItem(
            STORAGE.LAST_SURAH
        )
    ) || 1;


/*==================================================
                    HELPERS
==================================================*/

function $(id) {
    return document.getElementById(id);
}


/*==================================================
                PAGE START
==================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Iqranix Quran system starting..."
        );

        loadSurahs();

        setupComingSoonFeatures();

        setupArabicReader();

        setupAudio();

    }
);


/*==================================================
                COMING SOON FEATURES
==================================================*/

function setupComingSoonFeatures() {

    /*
    Tafsir
    */

    const tafsirCard =
        document.querySelector(
            'a[href="tafsir.html"]'
        );

    if (tafsirCard) {

        tafsirCard.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showComingSoon(
                    "Translation & Tafsir"
                );

            }
        );

    }


    /*
    AI Recitation Training
    */

    const aiCard =
        document.querySelector(
            'a[href="ai-training.html"]'
        );

    if (aiCard) {

        aiCard.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showComingSoon(
                    "AI Recitation Training"
                );

            }
        );

    }


    /*
    Memorization
    */

    const memorizationCard =
        document.querySelector(
            'a[href="memorization.html"]'
        );

    if (memorizationCard) {

        memorizationCard.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                showComingSoon(
                    "Quran Memorization"
                );

            }
        );

    }

}


/*==================================================
                COMING SOON MESSAGE
==================================================*/

function showComingSoon(feature) {

    /*
    Remove existing popup
    */

    const existing =
        document.getElementById(
            "iqranixComingSoon"
        );

    if (existing) {

        existing.remove();

    }


    /*
    Create overlay
    */

    const overlay =
        document.createElement("div");

    overlay.id =
        "iqranixComingSoon";

    overlay.innerHTML = `

        <div class="iqranix-coming-soon-box">

            <div class="coming-soon-icon">
                🕌
            </div>

            <h2>
                ${escapeHTML(feature)}
            </h2>

            <h3>
                Coming Soon, InshaAllah
            </h3>

            <p>
                This feature is currently being
                developed and will be available
                in a future Iqranix update.
            </p>

            <p class="coming-soon-dua">
                Please check for updates regularly.
            </p>

            <button
                id="comingSoonClose"
                type="button"
            >
                Continue
            </button>

        </div>

    `;

    document.body.appendChild(
        overlay
    );


    /*
    Close button
    */

    const closeButton =
        document.getElementById(
            "comingSoonClose"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                overlay.remove();

            }
        );

    }


    /*
    Close by tapping outside
    */

    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                overlay.remove();

            }

        }
    );

}


/*==================================================
                LOAD SURAHS
==================================================*/

async function loadSurahs() {

    const selectors = [

        "quranSurahSelect",

        "audioSurahSelect"

    ];


    try {

        const response =
            await fetch(
                `${API_BASE}/surah`
            );


        if (!response.ok) {

            throw new Error(
                "Surah API failed"
            );

        }


        const result =
            await response.json();


        surahs =
            result.data || [];


        console.log(
            "Loaded",
            surahs.length,
            "Surahs"
        );


        selectors.forEach(
            id => {

                const select =
                    $(id);

                if (!select) return;

                populateSurahSelect(
                    select
                );

            }
        );


        /*
        Set saved Surah
        */

        const mainSelect =
            $("quranSurahSelect");

        if (mainSelect) {

            mainSelect.value =
                String(currentSurah);

        }


        const audioSelect =
            $("audioSurahSelect");

        if (audioSelect) {

            audioSelect.value =
                String(currentSurah);

        }


        /*
        Load Quran
        */

        loadArabicQuran(
            currentSurah
        );


    } catch (error) {

        console.error(
            "Unable to load Surahs:",
            error
        );


        showError(
            "quranReader",
            "Unable to load the Quran. Please check your internet connection."
        );

    }

}


/*==================================================
            POPULATE SURAH SELECT
==================================================*/

function populateSurahSelect(
    select
) {

    select.innerHTML = "";


    surahs.forEach(
        surah => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                surah.number;


            option.textContent =
                `${surah.number}. ${surah.englishName} — ${surah.name}`;


            select.appendChild(
                option
            );

        }
    );

}


/*==================================================
                ARABIC READER
==================================================*/

function setupArabicReader() {

    const select =
        $("quranSurahSelect");

    const openButton =
        $("openQuranBtn");

    const previousButton =
        $("previousQuranBtn");

    const nextButton =
        $("nextQuranBtn");


    /*
    Surah selector
    */

    if (select) {

        select.addEventListener(
            "change",
            () => {

                loadArabicQuran(
                    Number(
                        select.value
                    )
                );

            }
        );

    }


    /*
    Open button
    */

    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                if (!select) return;

                loadArabicQuran(
                    Number(
                        select.value
                    )
                );

            }
        );

    }


    /*
    Previous
    */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                if (
                    currentSurah > 1
                ) {

                    loadArabicQuran(
                        currentSurah - 1
                    );

                }

            }
        );

    }


    /*
    Next
    */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentSurah < 114
                ) {

                    loadArabicQuran(
                        currentSurah + 1
                    );

                }

            }
        );

    }

}


/*==================================================
            LOAD ARABIC QURAN
==================================================*/

async function loadArabicQuran(
    number
) {

    if (
        !number ||
        number < 1 ||
        number > 114
    ) {

        return;

    }


    currentSurah =
        number;


    localStorage.setItem(
        STORAGE.LAST_SURAH,
        String(number)
    );


    /*
    Update selectors
    */

    const quranSelect =
        $("quranSurahSelect");

    if (quranSelect) {

        quranSelect.value =
            String(number);

    }


    const audioSelect =
        $("audioSurahSelect");

    if (audioSelect) {

        audioSelect.value =
            String(number);

    }


    /*
    Loading message
    */

    const reader =
        $("quranReader");

    if (reader) {

        reader.innerHTML = `

            <div class="quran-loading">

                Loading Arabic Quran...

            </div>

        `;

    }


    try {

        const response =
            await fetch(
                `${API_BASE}/surah/${number}/quran-uthmani`
            );


        if (!response.ok) {

            throw new Error(
                "Quran request failed"
            );

        }


        const result =
            await response.json();


        displayArabicQuran(
            result.data
        );


    } catch (error) {

        console.error(
            "Arabic Quran error:",
            error
        );


        showError(
            "quranReader",
            "Unable to load this Surah."
        );

    }

}


/*==================================================
            DISPLAY ARABIC QURAN
==================================================*/

function displayArabicQuran(
    data
) {

    const reader =
        $("quranReader");


    if (!reader) return;


    reader.innerHTML = "";


    /*
    Surah header
    */

    const header =
        document.createElement(
            "div"
        );


    header.className =
        "quran-surah-header";


    header.innerHTML = `

        <h2>
            ${escapeHTML(data.name)}
        </h2>

        <p>

            ${escapeHTML(
                data.englishName
            )}

            •

            ${data.numberOfAyahs}

            Ayahs

        </p>

    `;


    reader.appendChild(
        header
    );


    /*
    Arabic verses
    */

    const container =
        document.createElement(
            "div"
        );


    container.className =
        "arabic-quran";


    const ayahs =
        data.ayahs || [];


    ayahs.forEach(
        ayah => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "arabic-ayah";


            element.dataset.ayah =
                ayah.numberInSurah;


            element.innerHTML = `

                <span class="ayah-number">

                    ${ayah.numberInSurah}

                </span>

                <span class="ayah-text">

                    ${escapeHTML(
                        ayah.text
                    )}

                </span>

            `;


            container.appendChild(
                element
            );

        }
    );


    reader.appendChild(
        container
    );

}


/*==================================================
                    AUDIO
==================================================*/

function setupAudio() {

    const surahSelect =
        $("audioSurahSelect");

    const reciterSelect =
        $("audioReciterSelect");

    const playButton =
        $("audioPlayBtn");

    const previousButton =
        $("audioPreviousBtn");

    const nextButton =
        $("audioNextBtn");


    /*
    Surah selection
    */

    if (surahSelect) {

        surahSelect.addEventListener(
            "change",
            () => {

                currentSurah =
                    Number(
                        surahSelect.value
                    );

                localStorage.setItem(
                    STORAGE.LAST_SURAH,
                    String(currentSurah)
                );

                loadAudio();

            }
        );

    }


    /*
    Reciter selection
    */

    if (reciterSelect) {

        reciterSelect.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    STORAGE.RECITER,
                    reciterSelect.value
                );

                loadAudio();

            }
        );

    }


    /*
    Play / pause
    */

    if (playButton) {

        playButton.addEventListener(
            "click",
            () => {

                const audio =
                    $("quranAudio");


                if (!audio) return;


                if (audio.paused) {

                    audio.play()
                        .catch(
                            error =>
                                console.error(
                                    error
                                )
                        );

                } else {

                    audio.pause();

                }

            }
        );

    }


    /*
    Previous audio
    */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                if (
                    currentSurah > 1
                ) {

                    currentSurah--;

                    updateAudioSurah();

                    loadAudio();

                }

            }
        );

    }


    /*
    Next audio
    */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentSurah < 114
                ) {

                    currentSurah++;

                    updateAudioSurah();

                    loadAudio();

                }

            }
        );

    }


    /*
    Load reciters
    */

    loadReciters();

}


/*==================================================
                LOAD RECITERS
==================================================*/

async function loadReciters() {

    const select =
        $("audioReciterSelect");


    if (!select) return;


    try {

        const response =
            await fetch(
                "https://mp3quran.net/api/v3/reciters?language=eng"
            );


        if (!response.ok) {

            throw new Error(
                "Reciter API failed"
            );

        }


        const result =
            await response.json();


        const reciters =
            result.reciters || [];


        select.innerHTML = "";


        reciters.forEach(
            reciter => {

                if (
                    !reciter.moshaf ||
                    !reciter.moshaf.length
                ) {

                    return;

                }


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    reciter.id;


                option.textContent =
                    reciter.name;


                select.appendChild(
                    option
                );

            }
        );


        /*
        Restore saved reciter
        */

        const saved =
            localStorage.getItem(
                STORAGE.RECITER
            );


        if (saved) {

            select.value =
                saved;

        }


        loadAudio();


    } catch (error) {

        console.error(
            "Reciter loading failed:",
            error
        );


        select.innerHTML = `

            <option>

                Unable to load reciters

            </option>

        `;

    }

}


/*==================================================
                LOAD QURAN AUDIO
==================================================*/

async function loadAudio() {

    const select =
        $("audioReciterSelect");

    const audio =
        $("quranAudio");


    if (
        !select ||
        !audio ||
        !select.value
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                "https://mp3quran.net/api/v3/reciters?language=eng"
            );


        const result =
            await response.json();


        const reciter =
            (result.reciters || [])
            .find(
                item =>
                    String(item.id) ===
                    String(select.value)
            );


        if (!reciter) return;


        /*
        Find compatible Moshaf
        */

        const moshaf =
            (reciter.moshaf || [])
            .find(
                item => {

                    if (
                        !item.surah_list
                    ) {

                        return false;

                    }


                    return item.surah_list
                        .split(",")
                        .includes(
                            String(
                                currentSurah
                            )
                        );

                }
            );


        if (!moshaf) {

            console.log(
                "Selected reciter does not have this Surah."
            );

            return;

        }


        let server =
            moshaf.server;


        if (
            !server.endsWith("/")
        ) {

            server += "/";

        }


        const file =
            String(
                currentSurah
            ).padStart(
                3,
                "0"
            );


        audio.src =
            `${server}${file}.mp3`;


        audio.load();


    } catch (error) {

        console.error(
            "Audio loading error:",
            error
        );

    }

}


/*==================================================
        UPDATE AUDIO SURAH SELECTOR
==================================================*/

function updateAudioSurah() {

    const select =
        $("audioSurahSelect");


    if (select) {

        select.value =
            String(currentSurah);

    }

}


/*==================================================
                    ERROR
==================================================*/

function showError(
    elementId,
    message
) {

    const element =
        $(elementId);


    if (!element) return;


    element.innerHTML = `

        <div class="quran-error">

            ${escapeHTML(message)}

        </div>

    `;

}


/*==================================================
                ESCAPE HTML
==================================================*/

function escapeHTML(
    text
) {

    if (
        text === null ||
        text === undefined
    ) {

        return "";

    }


    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/*==================================================
                    READY
==================================================*/

console.log(
    "✓ Iqranix Quran.js Loaded"
);
/*==================================================
        IQRANIX — COMING SOON FEATURES
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const comingSoonCards =
        document.querySelectorAll(".coming-soon-feature");

    comingSoonCards.forEach(card => {

        card.addEventListener("click", function(event) {

            event.preventDefault();

            const feature =
                this.dataset.feature || "This feature";

            showComingSoon(feature);

        });

    });

});


/*==================================================
                COMING SOON MESSAGE
==================================================*/

function showComingSoon(feature) {

    const existing =
        document.getElementById("comingSoonOverlay");

    if (existing) {
        existing.remove();
    }

    const overlay =
        document.createElement("div");

    overlay.id = "comingSoonOverlay";

    overlay.innerHTML = `

        <div class="coming-soon-box">

            <div class="coming-soon-icon">
                <i class="fas fa-hourglass-half"></i>
            </div>

            <h2>
                ${escapeHTML(feature)}
            </h2>

            <h3>
                Coming Soon, InshaAllah
            </h3>

            <p>
                This feature is currently being prepared
                and will be available in a future Iqranix
                update, InshaAllah.
            </p>

            <p class="coming-soon-dua">
                جزاكم الله خيرًا على صبركم
            </p>

            <p class="coming-soon-update">
                Check for updates to get the latest
                Iqranix features.
            </p>

            <button
                type="button"
                id="closeComingSoon"
            >
                Continue
            </button>

        </div>

    `;

    document.body.appendChild(overlay);

    const closeButton =
        document.getElementById("closeComingSoon");

    if (closeButton) {

        closeButton.addEventListener("click", () => {

            overlay.remove();

        });

    }

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {

            overlay.remove();

        }

    });

}