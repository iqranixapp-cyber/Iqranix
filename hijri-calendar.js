"use strict";

/* =====================================================
   IQranix — Hijri Calendar
   hijri-calendar.js

   Files:
   hijri-calendar.html
   hijri-calendar.css
===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================= */

        const backButton =
            document.getElementById(
                "backButton"
            );

        const todayButton =
            document.getElementById(
                "todayButton"
            );

        const previousMonth =
            document.getElementById(
                "previousMonth"
            );

        const nextMonth =
            document.getElementById(
                "nextMonth"
            );

        const todayHijri =
            document.getElementById(
                "todayHijri"
            );

        const todayGregorian =
            document.getElementById(
                "todayGregorian"
            );

        const todayDay =
            document.getElementById(
                "todayDay"
            );

        const todayGregorianShort =
            document.getElementById(
                "todayGregorianShort"
            );

        const hijriMonthName =
            document.getElementById(
                "hijriMonthName"
            );

        const hijriYear =
            document.getElementById(
                "hijriYear"
            );

        const calendarGrid =
            document.getElementById(
                "calendarGrid"
            );

        const selectedHijri =
            document.getElementById(
                "selectedHijri"
            );

        const selectedGregorian =
            document.getElementById(
                "selectedGregorian"
            );


        /* =================================================
           API
        ================================================= */

        const API =
            "https://api.aladhan.com/v1";


        /* =================================================
           MONTHS
        ================================================= */

        const HIJRI_MONTHS = [

            "Muharram",

            "Safar",

            "Rabi' al-Awwal",

            "Rabi' al-Thani",

            "Jumada al-Awwal",

            "Jumada al-Thani",

            "Rajab",

            "Sha'ban",

            "Ramadan",

            "Shawwal",

            "Dhu al-Qi'dah",

            "Dhu al-Hijjah"

        ];


        /* =================================================
           STATE
        ================================================= */

        let today =
            new Date();

        let todayHijriData =
            null;

        let currentHijriMonth =
            null;

        let currentHijriYear =
            null;

        let currentMonthData =
            [];


        /* =================================================
           DATE FORMAT
        ================================================= */

        function pad(
            number
        ) {

            return String(
                number
            ).padStart(
                2,
                "0"
            );

        }


        /*
           AlAdhan expects:
           DD-MM-YYYY
        */

        function apiDate(
            date
        ) {

            return (
                pad(
                    date.getDate()
                ) +
                "-" +
                pad(
                    date.getMonth() + 1
                ) +
                "-" +
                date.getFullYear()
            );

        }


        function formatDate(
            date
        ) {

            return date.toLocaleDateString(
                undefined,
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

        }


        function getMonthName(
            number
        ) {

            return (
                HIJRI_MONTHS[
                    Number(number) - 1
                ] ||
                "Hijri Month"
            );

        }


        /* =================================================
           LOAD TODAY
        ================================================= */

        async function loadToday() {

            today =
                new Date();

            const date =
                apiDate(
                    today
                );


            try {

                const response =
                    await fetch(
                        `${API}/gToH?date=${date}`
                    );


                if (!response.ok) {

                    throw new Error(
                        "Hijri API request failed"
                    );

                }


                const result =
                    await response.json();


                if (
                    !result.data ||
                    !result.data.hijri
                ) {

                    throw new Error(
                        "Hijri information missing"
                    );

                }


                todayHijriData =
                    result.data.hijri;


                currentHijriMonth =
                    Number(
                        todayHijriData
                            .month
                            .number
                    );


                currentHijriYear =
                    Number(
                        todayHijriData.year
                    );


                displayToday();


                await loadMonth(
                    currentHijriYear,
                    currentHijriMonth
                );


            } catch (error) {

                console.error(
                    "IQranix Hijri error:",
                    error
                );


                /*
                   If API fails, use a local
                   tabular calculation.
                */

                useFallback();

            }

        }


        /* =================================================
           DISPLAY TODAY
        ================================================= */

        function displayToday() {

            if (
                !todayHijriData
            ) {

                return;

            }


            const day =
                Number(
                    todayHijriData.day
                );


            const month =
                Number(
                    todayHijriData
                        .month
                        .number
                );


            const year =
                Number(
                    todayHijriData.year
                );


            const monthName =
                getMonthName(
                    month
                );


            if (todayHijri) {

                todayHijri.textContent =
                    `${day} ${monthName} ${year} AH`;

            }


            if (todayGregorian) {

                todayGregorian.textContent =
                    formatDate(
                        today
                    );

            }


            if (todayDay) {

                todayDay.textContent =
                    day;

            }


            if (todayGregorianShort) {

                todayGregorianShort.textContent =
                    formatDate(
                        today
                    );

            }


            if (selectedHijri) {

                selectedHijri.textContent =
                    `${day} ${monthName} ${year} AH`;

            }


            if (selectedGregorian) {

                selectedGregorian.textContent =
                    formatDate(
                        today
                    );

            }


            updateMonthTitle();

        }


        /* =================================================
           MONTH TITLE
        ================================================= */

        function updateMonthTitle() {

            if (hijriMonthName) {

                hijriMonthName.textContent =
                    getMonthName(
                        currentHijriMonth
                    );

            }


            if (hijriYear) {

                hijriYear.textContent =
                    `${currentHijriYear} AH`;

            }

        }


        /* =================================================
           LOAD MONTH
        ================================================= */

        async function loadMonth(
            year,
            month
        ) {

            if (!calendarGrid) {

                return;

            }


            showLoading();


            try {

                const response =
                    await fetch(
                        `${API}/hToCalendar/${year}/${month}`
                    );


                if (!response.ok) {

                    throw new Error(
                        "Calendar API failed"
                    );

                }


                const result =
                    await response.json();


                if (
                    !result.data ||
                    !Array.isArray(
                        result.data
                    )
                ) {

                    throw new Error(
                        "Invalid calendar data"
                    );

                }


                currentMonthData =
                    result.data;


                currentHijriYear =
                    Number(year);

                currentHijriMonth =
                    Number(month);


                updateMonthTitle();

                renderCalendar();


            } catch (error) {

                console.error(
                    "Month API error:",
                    error
                );


                renderFallbackMonth();

            }

        }


        /* =================================================
           LOADING
        ================================================= */

        function showLoading() {

            calendarGrid.innerHTML =
                "";


            for (
                let i = 0;
                i < 35;
                i++
            ) {

                const cell =
                    document.createElement(
                        "div"
                    );


                cell.className =
                    "calendar-day loading-day";


                cell.innerHTML =
                    "<span>•</span>";


                calendarGrid.appendChild(
                    cell
                );

            }

        }


        /* =================================================
           RENDER CALENDAR
        ================================================= */

        function renderCalendar() {

            calendarGrid.innerHTML =
                "";


            if (
                !currentMonthData.length
            ) {

                renderFallbackMonth();

                return;

            }


            const firstDay =
                currentMonthData[0]
                    .date
                    .gregorian
                    .weekday
                    .en;


            const weekdayMap = {

                Sunday: 0,

                Monday: 1,

                Tuesday: 2,

                Wednesday: 3,

                Thursday: 4,

                Friday: 5,

                Saturday: 6

            };


            const offset =
                weekdayMap[
                    firstDay
                ] ?? 0;


            /*
               Empty cells before
               the first Hijri day.
            */

            for (
                let i = 0;
                i < offset;
                i++
            ) {

                const empty =
                    document.createElement(
                        "div"
                    );


                empty.className =
                    "calendar-empty";


                calendarGrid.appendChild(
                    empty
                );

            }


            /*
               Create Hijri days.
            */

            currentMonthData.forEach(
                item => {

                    const hijri =
                        item.date.hijri;

                    const gregorian =
                        item.date.gregorian;


                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.className =
                        "calendar-day";


                    /*
                       EXACT TODAY CHECK.

                       We compare the Gregorian
                       date from the API with the
                       phone's current date.
                    */

                    const isToday =
                        Number(
                            gregorian.year
                        ) ===
                        today.getFullYear()

                        &&

                        Number(
                            gregorian.month.number
                        ) ===
                        today.getMonth() + 1

                        &&

                        Number(
                            gregorian.day
                        ) ===
                        today.getDate();


                    /*
                       Add the TODAY class.

                       CSS creates the circle.
                    */

                    if (isToday) {

                        button.classList.add(
                            "today"
                        );

                        button.setAttribute(
                            "aria-label",
                            "Today"
                        );

                    }


                    button.innerHTML = `

                        <span class="hijri-number">
                            ${hijri.day}
                        </span>

                        <span class="gregorian-number">
                            ${gregorian.day}
                        </span>

                    `;


                    button.addEventListener(
                        "click",
                        () => {

                            selectDay(
                                hijri,
                                gregorian
                            );

                        }
                    );


                    calendarGrid.appendChild(
                        button
                    );

                }
            );

        }


        /* =================================================
           SELECT DATE
        ================================================= */

        function selectDay(
            hijri,
            gregorian
        ) {

            const month =
                getMonthName(
                    hijri.month.number
                );


            if (selectedHijri) {

                selectedHijri.textContent =
                    `${hijri.day} ${month} ${hijri.year} AH`;

            }


            if (selectedGregorian) {

                selectedGregorian.textContent =
                    formatGregorianObject(
                        gregorian
                    );

            }

        }


        function formatGregorianObject(
            gregorian
        ) {

            if (!gregorian) {

                return "";

            }


            return (
                `${gregorian.day} ` +
                `${gregorian.month.en} ` +
                `${gregorian.year}`
            );

        }


        /* =================================================
           PREVIOUS MONTH
        ================================================= */

        async function previousMonthHandler() {

            let month =
                currentHijriMonth - 1;

            let year =
                currentHijriYear;


            if (month < 1) {

                month = 12;

                year--;

            }


            await loadMonth(
                year,
                month
            );

        }


        /* =================================================
           NEXT MONTH
        ================================================= */

        async function nextMonthHandler() {

            let month =
                currentHijriMonth + 1;

            let year =
                currentHijriYear;


            if (month > 12) {

                month = 1;

                year++;

            }


            await loadMonth(
                year,
                month
            );

        }


        /* =================================================
           TODAY BUTTON
        ================================================= */

        async function todayHandler() {

            await loadToday();


            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );

        }


        /* =================================================
           FALLBACK
        ================================================= */

        function useFallback() {

            const converted =
                approximateHijri(
                    today
                );


            todayHijriData = {

                day:
                    converted.day,

                year:
                    converted.year,

                month: {

                    number:
                        converted.month

                }

            };


            currentHijriMonth =
                converted.month;

            currentHijriYear =
                converted.year;


            displayToday();

            renderFallbackMonth();

        }


        /* =================================================
           APPROXIMATE HIJRI
        ================================================= */

        function approximateHijri(
            date
        ) {

            const jd =
                gregorianToJulian(
                    date
                );


            const islamicEpoch =
                1948439;


            const days =
                Math.floor(
                    jd -
                    islamicEpoch
                );


            const year =
                Math.floor(
                    (
                        30 * days +
                        10646
                    ) /
                    10631
                );


            const month =
                Math.min(
                    12,
                    Math.ceil(
                        (
                            days -
                            (
                                354 *
                                (
                                    year - 1
                                )
                            ) -
                            Math.floor(
                                (
                                    3 +
                                    11 * year
                                ) / 30
                            ) +
                            29
                        ) / 29.5
                    )
                );


            const day =
                days
                -
                (
                    354 *
                    (
                        year - 1
                    )
                )
                -
                Math.floor(
                    (
                        3 +
                        11 * year
                    ) / 30
                )
                -
                Math.floor(
                    29.5 *
                    (
                        month - 1
                    )
                )
                +
                1;


            return {

                day:
                    Math.max(
                        1,
                        Math.min(
                            30,
                            day
                        )
                    ),

                month:
                    Math.max(
                        1,
                        Math.min(
                            12,
                            month
                        )
                    ),

                year:
                    year

            };

        }


        function gregorianToJulian(
            date
        ) {

            let year =
                date.getFullYear();

            let month =
                date.getMonth() + 1;

            const day =
                date.getDate();


            if (month <= 2) {

                year--;

                month += 12;

            }


            const A =
                Math.floor(
                    year / 100
                );


            const B =
                2 -
                A +
                Math.floor(
                    A / 4
                );


            return Math.floor(
                365.25 *
                (
                    year + 4716
                )
            )
            +
            Math.floor(
                30.6001 *
                (
                    month + 1
                )
            )
            +
            day +
            B -
            1524.5;

        }


        /* =================================================
           FALLBACK MONTH
        ================================================= */

        function renderFallbackMonth() {

            calendarGrid.innerHTML =
                "";


            /*
               Odd Hijri months are normally
               30 days and even months 29
               in the tabular approximation.
            */

            const days =
                currentHijriMonth % 2 === 1
                    ? 30
                    : 29;


            let offset = 0;


            /*
               If this is today's month,
               calculate where today's
               Hijri day belongs.
            */

            if (
                todayHijriData &&

                Number(
                    todayHijriData
                        .month
                        .number
                ) ===
                currentHijriMonth

                &&

                Number(
                    todayHijriData.year
                ) ===
                currentHijriYear
            ) {

                const hijriDay =
                    Number(
                        todayHijriData.day
                    );


                offset =
                    (
                        today.getDay()
                        -
                        (
                            hijriDay - 1
                        )
                    ) % 7;


                if (offset < 0) {

                    offset += 7;

                }

            }


            /*
               Empty cells.
            */

            for (
                let i = 0;
                i < offset;
                i++
            ) {

                const empty =
                    document.createElement(
                        "div"
                    );


                empty.className =
                    "calendar-empty";


                calendarGrid.appendChild(
                    empty
                );

            }


            /*
               Days.
            */

            for (
                let day = 1;
                day <= days;
                day++
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "calendar-day";


                const isToday =
                    todayHijriData &&

                    Number(
                        todayHijriData
                            .month
                            .number
                    ) ===
                    currentHijriMonth

                    &&

                    Number(
                        todayHijriData.year
                    ) ===
                    currentHijriYear

                    &&

                    day ===
                    Number(
                        todayHijriData.day
                    );


                if (isToday) {

                    button.classList.add(
                        "today"
                    );

                }


                button.innerHTML = `

                    <span class="hijri-number">
                        ${day}
                    </span>

                    <span class="gregorian-number">
                        —
                    </span>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        if (selectedHijri) {

                            selectedHijri.textContent =
                                `${day} ${getMonthName(currentHijriMonth)} ${currentHijriYear} AH`;

                        }


                        if (selectedGregorian) {

                            if (isToday) {

                                selectedGregorian.textContent =
                                    formatDate(
                                        today
                                    );

                            } else {

                                selectedGregorian.textContent =
                                    "Gregorian date unavailable";

                            }

                        }

                    }
                );


                calendarGrid.appendChild(
                    button
                );

            }

        }


        /* =================================================
           BACK BUTTON
        ================================================= */

        if (backButton) {

            backButton.addEventListener(
                "click",
                () => {

                    if (
                        window.history.length > 1
                    ) {

                        window.history.back();

                    } else {

                        window.location.href =
                            "index.html";

                    }

                }
            );

        }


        /* =================================================
           EVENT LISTENERS
        ================================================= */

        if (todayButton) {

            todayButton.addEventListener(
                "click",
                todayHandler
            );

        }


        if (previousMonth) {

            previousMonth.addEventListener(
                "click",
                previousMonthHandler
            );

        }


        if (nextMonth) {

            nextMonth.addEventListener(
                "click",
                nextMonthHandler
            );

        }


        /* =================================================
           START
        ================================================= */

        console.log(
            "🌙 IQranix Hijri Calendar loaded."
        );


        loadToday();

    }
);