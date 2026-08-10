/* =========================================================
   IQRANIX QURAN READER
   COMPLETE VERSION
   =========================================================
   Includes:
   - 114 Surah selector
   - Quran Uthmani text
   - Multiple reciters
   - Surah audio
   - Previous / Next Surah
   - Previous / Next Ayah
   - Ayah selection
   - Bookmark
   - Font controls
   - Reader settings
   - Loading fix
   - Error handling
   ========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
   ========================================================= */

const API_BASE =
    "https://api.alquran.cloud/v1";

const AUDIO_BASE =
    "https://cdn.islamic.network/quran/audio-surah/128";

const DEFAULT_RECITER =
    "ar.alafasy";


/* =========================================================
   SURAH LIST
   ========================================================= */

const SURAHS = [

    [1, "الفاتحة", "Al-Fatihah"],
    [2, "البقرة", "Al-Baqarah"],
    [3, "آل عمران", "Aal-E-Imran"],
    [4, "النساء", "An-Nisa"],
    [5, "المائدة", "Al-Ma'idah"],
    [6, "الأنعام", "Al-An'am"],
    [7, "الأعراف", "Al-A'raf"],
    [8, "الأنفال", "Al-Anfal"],
    [9, "التوبة", "At-Tawbah"],
    [10, "يونس", "Yunus"],
    [11, "هود", "Hud"],
    [12, "يوسف", "Yusuf"],
    [13, "الرعد", "Ar-Ra'd"],
    [14, "إبراهيم", "Ibrahim"],
    [15, "الحجر", "Al-Hijr"],
    [16, "النحل", "An-Nahl"],
    [17, "الإسراء", "Al-Isra"],
    [18, "الكهف", "Al-Kahf"],
    [19, "مريم", "Maryam"],
    [20, "طه", "Taha"],
    [21, "الأنبياء", "Al-Anbiya"],
    [22, "الحج", "Al-Hajj"],
    [23, "المؤمنون", "Al-Mu'minun"],
    [24, "النور", "An-Nur"],
    [25, "الفرقان", "Al-Furqan"],
    [26, "الشعراء", "Ash-Shu'ara"],
    [27, "النمل", "An-Naml"],
    [28, "القصص", "Al-Qasas"],
    [29, "العنكبوت", "Al-Ankabut"],
    [30, "الروم", "Ar-Rum"],
    [31, "لقمان", "Luqman"],
    [32, "السجدة", "As-Sajdah"],
    [33, "الأحزاب", "Al-Ahzab"],
    [34, "سبأ", "Saba"],
    [35, "فاطر", "Fatir"],
    [36, "يس", "Ya-Sin"],
    [37, "الصافات", "As-Saffat"],
    [38, "ص", "Sad"],
    [39, "الزمر", "Az-Zumar"],
    [40, "غافر", "Ghafir"],
    [41, "فصلت", "Fussilat"],
    [42, "الشورى", "Ash-Shura"],
    [43, "الزخرف", "Az-Zukhruf"],
    [44, "الدخان", "Ad-Dukhan"],
    [45, "الجاثية", "Al-Jathiyah"],
    [46, "الأحقاف", "Al-Ahqaf"],
    [47, "محمد", "Muhammad"],
    [48, "الفتح", "Al-Fath"],
    [49, "الحجرات", "Al-Hujurat"],
    [50, "ق", "Qaf"],
    [51, "الذاريات", "Adh-Dhariyat"],
    [52, "الطور", "At-Tur"],
    [53, "النجم", "An-Najm"],
    [54, "القمر", "Al-Qamar"],
    [55, "الرحمن", "Ar-Rahman"],
    [56, "الواقعة", "Al-Waqi'ah"],
    [57, "الحديد", "Al-Hadid"],
    [58, "المجادلة", "Al-Mujadilah"],
    [59, "الحشر", "Al-Hashr"],
    [60, "الممتحنة", "Al-Mumtahanah"],
    [61, "الصف", "As-Saff"],
    [62, "الجمعة", "Al-Jumu'ah"],
    [63, "المنافقون", "Al-Munafiqun"],
    [64, "التغابن", "At-Taghabun"],
    [65, "الطلاق", "At-Talaq"],
    [66, "التحريم", "At-Tahrim"],
    [67, "الملك", "Al-Mulk"],
    [68, "القلم", "Al-Qalam"],
    [69, "الحاقة", "Al-Haqqah"],
    [70, "المعارج", "Al-Ma'arij"],
    [71, "نوح", "Nuh"],
    [72, "الجن", "Al-Jinn"],
    [73, "المزمل", "Al-Muzzammil"],
    [74, "المدثر", "Al-Muddaththir"],
    [75, "القيامة", "Al-Qiyamah"],
    [76, "الإنسان", "Al-Insan"],
    [77, "المرسلات", "Al-Mursalat"],
    [78, "النبأ", "An-Naba"],
    [79, "النازعات", "An-Nazi'at"],
    [80, "عبس", "Abasa"],
    [81, "التكوير", "At-Takwir"],
    [82, "الانفطار", "Al-Infitar"],
    [83, "المطففين", "Al-Mutaffifin"],
    [84, "الانشقاق", "Al-Inshiqaq"],
    [85, "البروج", "Al-Buruj"],
    [86, "الطارق", "At-Tariq"],
    [87, "الأعلى", "Al-A'la"],
    [88, "الغاشية", "Al-Ghashiyah"],
    [89, "الفجر", "Al-Fajr"],
    [90, "البلد", "Al-Balad"],
    [91, "الشمس", "Ash-Shams"],
    [92, "الليل", "Al-Layl"],
    [93, "الضحى", "Ad-Duha"],
    [94, "الشرح", "Ash-Sharh"],
    [95, "التين", "At-Tin"],
    [96, "العلق", "Al-Alaq"],
    [97, "القدر", "Al-Qadr"],
    [98, "البينة", "Al-Bayyinah"],
    [99, "الزلزلة", "Az-Zalzalah"],
    [100, "العاديات", "Al-Adiyat"],
    [101, "القارعة", "Al-Qari'ah"],
    [102, "التكاثر", "At-Takathur"],
    [103, "العصر", "Al-Asr"],
    [104, "الهمزة", "Al-Humazah"],
    [105, "الفيل", "Al-Fil"],
    [106, "قريش", "Quraysh"],
    [107, "الماعون", "Al-Ma'un"],
    [108, "الكوثر", "Al-Kawthar"],
    [109, "الكافرون", "Al-Kafirun"],
    [110, "النصر", "An-Nasr"],
    [111, "المسد", "Al-Masad"],
    [112, "الإخلاص", "Al-Ikhlas"],
    [113, "الفلق", "Al-Falaq"],
    [114, "الناس", "An-Nas"]
];


/* =========================================================
   RECITERS
   ========================================================= */

const RECITERS = [

    {
        id: "ar.alafasy",
        name: "Mishary Alafasy"
    },

    {
        id: "ar.husary",
        name: "Mahmoud Khalil Al-Husary"
    },

    {
        id: "ar.abdulbasitmurattal",
        name: "Abdul Basit Abdul Samad"
    },

    {
        id: "ar.minshawi",
        name: "Mohamed Siddiq Al-Minshawi"
    },

    {
        id: "ar.mahermuaiqly",
        name: "Maher Al-Muaiqly"
    },

    {
        id: "ar.saoodshuraym",
        name: "Saud Al-Shuraim"
    },

    {
        id: "ar.abdurrahmaansudais",
        name: "Abdur-Rahmaan As-Sudais"
    },

    {
        id: "ar.muhammadayyoub",
        name: "Muhammad Ayyub"
    },

    {
        id: "ar.muhammadjibreel",
        name: "Muhammad Jibreel"
    }

];


/* =========================================================
   STATE
   ========================================================= */

let currentSurah = 1;

let currentSurahData = null;

let currentAyah = 1;

let isLoadingSurah = false;

let selectedReciter =
    localStorage.getItem("iqranixReciter") ||
    DEFAULT_RECITER;

let surahAudio = null;


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(selector) {

    return document.querySelector(
        selector
    );

}


function $all(selector) {

    return Array.from(
        document.querySelectorAll(
            selector
        )
    );

}


/* =========================================================
   TEXT HELPER
   ========================================================= */

function setText(
    selector,
    value
) {

    const element =
        $(selector);

    if (!element) return;

    element.textContent =
        value ?? "";

}


/* =========================================================
   GET SURAH NUMBER
   ========================================================= */

function getSurahNumber() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const value =
        params.get("surah") ||
        params.get("chapter") ||
        params.get("id");

    const number =
        parseInt(
            value,
            10
        );

    if (
        Number.isInteger(number) &&
        number >= 1 &&
        number <= 114
    ) {

        return number;

    }

    return 1;

}


/* =========================================================
   UPDATE URL
   ========================================================= */

function updateSurahUrl(
    number
) {

    const url =
        new URL(
            window.location.href
        );

    url.searchParams.set(
        "surah",
        number
    );

    window.history.replaceState(
        {},
        "",
        url.toString()
    );

}


/* =========================================================
   SURAH SELECTOR
   ========================================================= */

function setupSurahSelector() {

    /*
       Try to find an existing selector
       first.
    */

    let select =
        $("#surahSelect") ||
        $("#surahSelector") ||
        $(".surah-select");


    /*
       If there is no selector in the
       HTML, create one automatically.
    */

    if (!select) {

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.id =
            "iqranixSurahSelector";

        wrapper.style.cssText = `
            width:100%;
            margin:12px 0;
        `;


        const label =
            document.createElement(
                "label"
            );

        label.textContent =
            "Choose Surah";

        label.setAttribute(
            "for",
            "iqranixSurahSelect"
        );

        label.style.cssText = `
            display:block;
            margin-bottom:6px;
            font-family:Poppins,sans-serif;
            font-size:13px;
            font-weight:600;
        `;


        select =
            document.createElement(
                "select"
            );

        select.id =
            "iqranixSurahSelect";

        select.style.cssText = `
            width:100%;
            min-height:44px;
            padding:10px 12px;
            border:1px solid #07895b;
            border-radius:10px;
            background:#ffffff;
            color:#222222;
            font-family:Poppins,sans-serif;
            font-size:14px;
            outline:none;
        `;


        wrapper.appendChild(
            label
        );

        wrapper.appendChild(
            select
        );


        /*
           Try to place the selector
           near the Quran header.
        */

        const target =
            $(".surah-header") ||
            $(".quran-header") ||
            $(".reader-header") ||
            $(".quran-main") ||
            $(".quran-content") ||
            $("#quranContent") ||
            document.body;


        if (
            target &&
            target !== document.body
        ) {

            target.prepend(
                wrapper
            );

        } else {

            document.body.prepend(
                wrapper
            );

        }

    }


    /*
       Clear old options.
    */

    select.innerHTML = "";


    /*
       Add all 114 Surahs.
    */

    SURAHS.forEach(
        surah => {

            const number =
                surah[0];

            const arabic =
                surah[1];

            const english =
                surah[2];


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                number;


            option.textContent =
                `${number}. ${english} — ${arabic}`;


            if (
                number ===
                currentSurah
            ) {

                option.selected =
                    true;

            }


            select.appendChild(
                option
            );

        }
    );


    /*
       When user chooses a Surah.
    */

    select.addEventListener(
        "change",
        () => {

            const number =
                parseInt(
                    select.value,
                    10
                );


            if (
                Number.isInteger(number) &&
                number >= 1 &&
                number <= 114
            ) {

                loadSurah(
                    number
                );

            }

        }
    );


    /*
       Keep selector synchronized
       with current Surah.
    */

    select.value =
        String(
            currentSurah
        );

}


/* =========================================================
   UPDATE SURAH SELECTOR
   ========================================================= */

function updateSurahSelector() {

    const select =
        $("#surahSelect") ||
        $("#surahSelector") ||
        $(".surah-select") ||
        $("#iqranixSurahSelect");


    if (!select) return;


    select.value =
        String(
            currentSurah
        );

}


/* =========================================================
   LOADING
   ========================================================= */

function showLoading() {

    const container =
        $("#ayahContainer") ||
        $("#quranText") ||
        $(".quran-text");


    if (!container) return;


    container.innerHTML = `
        <div
            class="temporary-quran-loading"
            style="
                text-align:center;
                padding:35px 15px;
                color:#07895b;
                font-family:Poppins,sans-serif;
                font-size:14px;
            "
        >
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading Quran...</span>
        </div>
    `;

}


function hideLoading() {

    $all(
        ".temporary-quran-loading, " +
        ".loading-message, " +
        "#loadingMessage"
    ).forEach(
        element => {

            element.remove();

        }
    );

}


/* =========================================================
   AUDIO ELEMENT
   ========================================================= */

function getAudioElement() {

    const selectors = [

        "#quranAudio",

        "#surahAudio",

        "#audioPlayer",

        ".quran-audio",

        ".audio-section audio",

        "audio"

    ];


    for (
        const selector of selectors
    ) {

        const audio =
            $(selector);


        if (audio) {

            return audio;

        }

    }


    return null;

}


/* =========================================================
   ENSURE AUDIO
   ========================================================= */

function ensureAudioElement() {

    let audio =
        getAudioElement();


    if (audio) {

        surahAudio =
            audio;

        return audio;

    }


    const section =
        $("#audioSection") ||
        $(".audio-section");


    if (!section) {

        return null;

    }


    audio =
        document.createElement(
            "audio"
        );


    audio.id =
        "quranAudio";


    audio.controls =
        true;


    audio.preload =
        "metadata";


    audio.style.width =
        "100%";


    section.appendChild(
        audio
    );


    surahAudio =
        audio;


    return audio;

}


/* =========================================================
   LOAD RECITERS
   ========================================================= */

function loadReciters() {

    const select =
        $("#reciterSelect");


    if (!select) {

        console.warn(
            "Reciter selector not found."
        );

        return;

    }


    select.innerHTML =
        "";


    RECITERS.forEach(
        reciter => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                reciter.id;


            option.textContent =
                reciter.name;


            if (
                reciter.id ===
                selectedReciter
            ) {

                option.selected =
                    true;

            }


            select.appendChild(
                option
            );

        }
    );


    select.value =
        selectedReciter;


    select.addEventListener(
        "change",
        () => {

            selectedReciter =
                select.value;


            localStorage.setItem(
                "iqranixReciter",
                selectedReciter
            );


            loadSurahAudio();

        }
    );

}


/* =========================================================
   RECITER NAME
   ========================================================= */

function getReciterName(
    id
) {

    const reciter =
        RECITERS.find(
            item =>
                item.id === id
        );


    return reciter
        ? reciter.name
        : "Selected reciter";

}


/* =========================================================
   AUDIO URL
   ========================================================= */

function getAudioUrl() {

    return (
        `${AUDIO_BASE}/` +
        `${selectedReciter}/` +
        `${currentSurah}.mp3`
    );

}


/* =========================================================
   AUDIO STATUS
   ========================================================= */

function updateAudioStatus(
    type,
    message
) {

    const subtitle =
        $(".audio-heading p");


    if (!subtitle) return;


    if (
        type === "loading"
    ) {

        subtitle.textContent =
            "Loading audio...";

        return;

    }


    if (
        type === "ready"
    ) {

        subtitle.textContent =
            `Full Surah • ${message}`;

        return;

    }


    if (
        type === "error"
    ) {

        subtitle.textContent =
            message;

        return;

    }


    subtitle.textContent =
        "Listen to the Surah";

}


/* =========================================================
   LOAD SURAH AUDIO
   ========================================================= */

function loadSurahAudio() {

    const audio =
        ensureAudioElement();


    if (!audio) return;


    const url =
        getAudioUrl();


    console.log(
        "Loading Quran audio:",
        url
    );


    try {

        audio.pause();

    } catch (error) {

        console.warn(
            error
        );

    }


    audio.removeAttribute(
        "src"
    );


    audio.load();


    audio.src =
        url;


    audio.preload =
        "metadata";


    audio.dataset.surah =
        currentSurah;


    audio.dataset.reciter =
        selectedReciter;


    updateAudioStatus(
        "loading",
        "Loading audio..."
    );


    audio.load();


    audio.onloadedmetadata =
        () => {

            updateAudioStatus(
                "ready",
                getReciterName(
                    selectedReciter
                )
            );

        };


    audio.onerror =
        () => {

            console.error(
                "Could not load audio:",
                url
            );


            updateAudioStatus(
                "error",
                "Audio unavailable"
            );

        };

}


/* =========================================================
   PLAY FULL SURAH
   ========================================================= */

async function playFullSurah() {

    const audio =
        ensureAudioElement();


    if (!audio) return;


    if (!audio.src) {

        loadSurahAudio();

    }


    updateAudioStatus(
        "loading",
        "Loading audio..."
    );


    try {

        await audio.play();

    } catch (error) {

        console.warn(
            "Playback requires user interaction:",
            error
        );


        updateAudioStatus(
            "ready",
            getReciterName(
                selectedReciter
            )
        );

    }

}


/* =========================================================
   STOP AUDIO
   ========================================================= */

function stopAudio() {

    const audio =
        ensureAudioElement();


    if (!audio) return;


    audio.pause();

    audio.currentTime =
        0;

}


/* =========================================================
   LOAD SURAH
   ========================================================= */

async function loadSurah(
    surahNumber
) {

    if (isLoadingSurah) {

        return;

    }


    if (
        surahNumber < 1 ||
        surahNumber > 114
    ) {

        return;

    }


    isLoadingSurah =
        true;


    currentSurah =
        surahNumber;


    currentAyah =
        1;


    updateSurahUrl(
        surahNumber
    );


    updateSurahSelector();


    showLoading();


    setText(
        "#surahEnglishName",
        "Loading..."
    );


    try {

        const response =
            await fetch(
                `${API_BASE}/surah/${surahNumber}/quran-uthmani`,
                {
                    cache:
                        "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const json =
            await response.json();


        if (
            !json ||
            !json.data
        ) {

            throw new Error(
                "Invalid Quran data"
            );

        }


        currentSurahData =
            json.data;


        renderSurah(
            currentSurahData
        );


        hideLoading();


        loadSurahAudio();


    } catch (error) {

        console.error(
            "Quran loading error:",
            error
        );


        hideLoading();


        showQuranError(
            "Unable to load this Surah. Please check your internet connection and try again."
        );


    } finally {

        isLoadingSurah =
            false;

    }

}


/* =========================================================
   RENDER SURAH
   ========================================================= */

function renderSurah(
    data
) {

    const englishName =
        data.englishName ||
        "Quran";


    const arabicName =
        data.name ||
        "";


    const totalAyahs =
        data.numberOfAyahs ||
        data.ayahs?.length ||
        0;


    const revelation =
        data.revelationType ===
        "Meccan"
            ? "Makkah"
            : data.revelationType ===
              "Medinan"
                ? "Madinah"
                : "";


    setText(
        "#surahEnglishName",
        englishName
    );


    setText(
        "#surahHeaderInfo",
        `${totalAyahs} Ayahs • ${revelation}`
    );


    setText(
        "#surahArabicName",
        arabicName
    );


    setText(
        "#surahEnglishTitle",
        englishName
    );


    setText(
        "#surahDetails",
        `${totalAyahs} Ayahs • ${revelation}`
    );


    const bismillah =
        $("#bismillah");


    if (bismillah) {

        bismillah.hidden =
            true;

    }


    renderAyahs(
        data.ayahs || []
    );


    currentAyah =
        1;


    updateAyahCounter();

    updateCurrentAyahLabel();

    updateSurahSelector();

}


/* =========================================================
   RENDER AYAHS
   ========================================================= */

function renderAyahs(
    ayahs
) {

    const container =
        $("#ayahContainer") ||
        $("#quranText") ||
        $(".quran-text");


    if (!container) {

        console.error(
            "Quran text container not found."
        );

        return;

    }


    container.innerHTML =
        "";


    ayahs.forEach(
        (ayah, index) => {

            const span =
                document.createElement(
                    "span"
                );


            span.className =
                "ayah";


            span.dataset.ayah =
                index + 1;


            span.dataset.ayahGlobal =
                ayah.number || "";


            const textNode =
                document.createTextNode(
                    ayah.text + " "
                );


            span.appendChild(
                textNode
            );


            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "ayah-number";


            number.textContent =
                toArabicNumber(
                    index + 1
                );


            span.appendChild(
                number
            );


            span.appendChild(
                document.createTextNode(
                    " "
                )
            );


            span.addEventListener(
                "click",
                () => {

                    setCurrentAyah(
                        index + 1
                    );

                }
            );


            container.appendChild(
                span
            );

        }
    );

}


/* =========================================================
   ARABIC NUMBERS
   ========================================================= */

function toArabicNumber(
    number
) {

    return String(
        number
    ).replace(
        /\d/g,
        digit =>
            "٠١٢٣٤٥٦٧٨٩"[
                digit
            ]
    );

}


/* =========================================================
   CURRENT AYAH
   ========================================================= */

function setCurrentAyah(
    number
) {

    const total =
        currentSurahData
            ?.ayahs
            ?.length || 0;


    if (
        number < 1 ||
        number > total
    ) {

        return;

    }


    currentAyah =
        number;


    $all(
        ".ayah.current"
    ).forEach(
        element => {

            element.classList.remove(
                "current"
            );

        }
    );


    const ayah =
        document.querySelector(
            `.ayah[data-ayah="${number}"]`
        );


    if (ayah) {

        ayah.classList.add(
            "current"
        );


        ayah.scrollIntoView({
            behavior:
                "smooth",
            block:
                "center"
        });

    }


    updateAyahCounter();

    updateCurrentAyahLabel();

}


/* =========================================================
   AYAH COUNTER
   ========================================================= */

function updateAyahCounter() {

    const total =
        currentSurahData
            ?.ayahs
            ?.length || 0;


    const counter =
        $(".ayah-counter");


    if (!counter) return;


    const strong =
        counter.querySelector(
            "strong"
        );


    if (strong) {

        strong.textContent =
            currentAyah;

    }


    const spans =
        counter.querySelectorAll(
            "span"
        );


    if (spans.length >= 2) {

        spans[1].textContent =
            total;

    }

}


/* =========================================================
   CURRENT AYAH LABEL
   ========================================================= */

function updateCurrentAyahLabel() {

    const label =
        $("#currentAyahLabel");


    if (!label) return;


    label.textContent =
        `Ayah ${currentAyah}`;

}


/* =========================================================
   NEXT AYAH
   ========================================================= */

function nextAyah() {

    const total =
        currentSurahData
            ?.ayahs
            ?.length || 0;


    if (
        currentAyah <
        total
    ) {

        setCurrentAyah(
            currentAyah + 1
        );

    } else {

        nextSurah();

    }

}


/* =========================================================
   PREVIOUS AYAH
   ========================================================= */

function previousAyah() {

    if (
        currentAyah > 1
    ) {

        setCurrentAyah(
            currentAyah - 1
        );

    } else {

        previousSurah();

    }

}


/* =========================================================
   NEXT SURAH
   ========================================================= */

function nextSurah() {

    if (
        currentSurah >= 114
    ) {

        return;

    }


    loadSurah(
        currentSurah + 1
    );

}


/* =========================================================
   PREVIOUS SURAH
   ========================================================= */

function previousSurah() {

    if (
        currentSurah <= 1
    ) {

        return;

    }


    loadSurah(
        currentSurah - 1
    );

}


/* =========================================================
   AUDIO BUTTONS
   ========================================================= */

function setupAudioButtons() {

    $all(
        "[data-action='play-audio'], " +
        "#playAudio, " +
        ".play-surah"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                playFullSurah
            );

        }
    );


    $all(
        "[data-action='stop-audio'], " +
        "#stopAudio, " +
        ".stop-audio"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                stopAudio
            );

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    $all(
        "#nextSurah, " +
        "[data-action='next-surah'], " +
        ".next-surah"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                nextSurah
            );

        }
    );


    $all(
        "#previousSurah, " +
        "[data-action='previous-surah'], " +
        ".previous-surah"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                previousSurah
            );

        }
    );


    $all(
        "#nextAyah, " +
        "[data-action='next-ayah']"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                nextAyah
            );

        }
    );


    $all(
        "#previousAyah, " +
        "[data-action='previous-ayah']"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                previousAyah
            );

        }
    );

}


/* =========================================================
   BACK BUTTON
   ========================================================= */

function setupBackButton() {

    const button =
        $("#backButton");


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            if (
                window.history.length > 1
            ) {

                window.history.back();

            } else {

                window.location.href =
                    "../pages/quran.html";

            }

        }
    );

}


/* =========================================================
   READER SETTINGS
   ========================================================= */

function setupReaderSettings() {

    const button =
        $("#readerSettingsButton");


    const panel =
        $("#readerSettings");


    const close =
        $("#closeSettings");


    if (
        !button ||
        !panel
    ) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            panel.hidden =
                !panel.hidden;

        }
    );


    if (close) {

        close.addEventListener(
            "click",
            () => {

                panel.hidden =
                    true;

            }
        );

    }

}


/* =========================================================
   FONT CONTROLS
   ========================================================= */

function setupFontControls() {

    const text =
        $("#ayahContainer") ||
        $(".quran-text");


    if (!text) return;


    const increase =
        $("#fontIncrease");


    const decrease =
        $("#fontDecrease");


    const savedSize =
        localStorage.getItem(
            "iqranixQuranFontSize"
        );


    if (savedSize) {

        const size =
            parseFloat(
                savedSize
            );


        if (
            Number.isFinite(size)
        ) {

            text.style.fontSize =
                `${size}px`;

        }

    }


    if (increase) {

        increase.addEventListener(
            "click",
            () => {

                const current =
                    parseFloat(
                        getComputedStyle(
                            text
                        ).fontSize
                    );


                const next =
                    Math.min(
                        60,
                        current + 2
                    );


                text.style.fontSize =
                    `${next}px`;


                localStorage.setItem(
                    "iqranixQuranFontSize",
                    next
                );

            }
        );

    }


    if (decrease) {

        decrease.addEventListener(
            "click",
            () => {

                const current =
                    parseFloat(
                        getComputedStyle(
                            text
                        ).fontSize
                    );


                const next =
                    Math.max(
                        24,
                        current - 2
                    );


                text.style.fontSize =
                    `${next}px`;


                localStorage.setItem(
                    "iqranixQuranFontSize",
                    next
                );

            }
        );

    }

}


/* =========================================================
   BOOKMARK
   ========================================================= */

function setupBookmark() {

    const button =
        $("#bookmarkButton");


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            const bookmark = {

                surah:
                    currentSurah,

                ayah:
                    currentAyah,

                surahName:
                    currentSurahData
                        ?.englishName ||
                    "",

                savedAt:
                    new Date()
                        .toISOString()

            };


            localStorage.setItem(
                "iqranixBookmark",
                JSON.stringify(
                    bookmark
                )
            );


            const original =
                button.innerHTML;


            button.innerHTML =
                `
                <i class="fas fa-bookmark"></i>
                Bookmarked
                `;


            setTimeout(
                () => {

                    button.innerHTML =
                        original;

                },
                1400
            );

        }
    );

}


/* =========================================================
   AUDIO EVENTS
   ========================================================= */

function setupAudioEvents() {

    const audio =
        ensureAudioElement();


    if (!audio) return;


    audio.addEventListener(
        "play",
        () => {

            updateAudioStatus(
                "ready",
                getReciterName(
                    selectedReciter
                )
            );

        }
    );


    audio.addEventListener(
        "ended",
        () => {

            updateAudioStatus(
                "ready",
                getReciterName(
                    selectedReciter
                )
            );

        }
    );


    audio.addEventListener(
        "error",
        () => {

            updateAudioStatus(
                "error",
                "Audio unavailable"
            );

        }
    );

}


/* =========================================================
   QURAN ERROR
   ========================================================= */

function showQuranError(
    message
) {

    const container =
        $("#ayahContainer") ||
        $("#quranText") ||
        $(".quran-text");


    if (!container) return;


    container.innerHTML = `
        <div
            class="quran-error"
            style="
                text-align:center;
                padding:45px 20px;
                color:#b3261e;
                font-family:Poppins,sans-serif;
                font-size:14px;
            "
        >

            <i
                class="fas fa-circle-exclamation"
                style="
                    font-size:30px;
                    margin-bottom:12px;
                    display:block;
                "
            ></i>

            ${escapeHtml(message)}

            <br><br>

            <button
                id="retryQuran"
                type="button"
                style="
                    background:#07895b;
                    color:white;
                    border:0;
                    border-radius:10px;
                    padding:10px 18px;
                    font-family:Poppins,sans-serif;
                "
            >
                Try Again
            </button>

        </div>
    `;


    const retry =
        $("#retryQuran");


    if (retry) {

        retry.addEventListener(
            "click",
            () => {

                loadSurah(
                    currentSurah
                );

            }
        );

    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(
    value
) {

    return String(
        value
    )

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


/* =========================================================
   INITIALIZE
   ========================================================= */

async function initQuranReader() {

    console.log(
        "IQRANIX Quran Reader starting..."
    );


    /*
       IMPORTANT:
       Get the Surah BEFORE creating
       the selector so the correct
       option is selected.
    */

    currentSurah =
        getSurahNumber();


    /*
       Create the 114-Surah selector.
    */

    setupSurahSelector();


    /*
       Existing features.
    */

    loadReciters();

    setupNavigation();

    setupAudioButtons();

    setupBackButton();

    setupReaderSettings();

    setupFontControls();

    setupBookmark();

    setupAudioEvents();


    /*
       Load selected Surah.
    */

    await loadSurah(
        currentSurah
    );


    console.log(
        "IQRANIX Quran Reader ready."
    );

}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initQuranReader
    );

} else {

    initQuranReader();

}


/* =========================================================
   GLOBAL API
   ========================================================= */

window.IqranixQuran = {

    loadSurah,

    nextSurah,

    previousSurah,

    nextAyah,

    previousAyah,

    playFullSurah,

    stopAudio,

    setCurrentAyah,

    loadSurahAudio

};