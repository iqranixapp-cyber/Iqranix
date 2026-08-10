/*
====================================
      IQRANIX NOTIFICATIONS.JS
====================================
      Central notification engine
      for IQRANIX.

      Handles:
      • Notification settings
      • Daily Quran reminder
      • Daily Hadith reminder
      • Daily Dua reminder
      • Morning Adhkar
      • Evening Adhkar
      • Jumu'ah reminder
      • Ramadan reminder
      • Last Ten Nights reminder
      • Eid reminder
      • Salah notifications
      • Selected Adhan playback
====================================
*/

"use strict";


/*
====================================
      STORAGE KEYS
====================================
*/

const NOTIFICATION_SETTINGS_KEY =
    "iqranixNotifications";

const NOTIFICATION_HISTORY_KEY =
    "iqranixNotificationHistory";


/*
====================================
      START
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loadSettings();

    setupPreviewButtons();

    setupSaveButton();

    setupScrollAnimation();

    setupButtonEffects();

    requestNotificationPermission();

    cleanNotificationHistory();

    startNotificationEngine();

    console.log(
        "IQRANIX Notification System Loaded."
    );

});


/*
====================================
      DEFAULT SETTINGS
====================================
*/

function getDefaultSettings() {

    return {

        notificationsToggle: false,

        dndToggle: false,

        prayerNotifications: false,

        beforePrayerReminder: false,

        reminderTime: "08:00",

        fajrAdhan: "",
        dhuhrAdhan: "",
        asrAdhan: "",
        maghribAdhan: "",
        ishaAdhan: "",

        dailyQuran: false,

        dailyHadith: false,

        dailyDua: false,

        morningAdhkar: false,

        eveningAdhkar: false,

        jumuahReminder: false,

        ramadanReminder: false,

        lastTenNights: false,

        eidReminder: false

    };

}


/*
====================================
      SAVE SETTINGS
====================================
*/

function setupSaveButton() {

    const saveButton =
        document.getElementById(
            "saveNotifications"
        );

    if (!saveButton) return;


    saveButton.addEventListener(
        "click",
        () => {

            const settings = {

                notificationsToggle:
                    getChecked(
                        "notificationsToggle"
                    ),

                dndToggle:
                    getChecked(
                        "dndToggle"
                    ),

                prayerNotifications:
                    getChecked(
                        "prayerNotifications"
                    ),

                beforePrayerReminder:
                    getChecked(
                        "beforePrayerReminder"
                    ),

                reminderTime:
                    getValue(
                        "reminderTime"
                    ),

                fajrAdhan:
                    getValue(
                        "fajrAdhan"
                    ),

                dhuhrAdhan:
                    getValue(
                        "dhuhrAdhan"
                    ),

                asrAdhan:
                    getValue(
                        "asrAdhan"
                    ),

                maghribAdhan:
                    getValue(
                        "maghribAdhan"
                    ),

                ishaAdhan:
                    getValue(
                        "ishaAdhan"
                    ),

                dailyQuran:
                    getChecked(
                        "dailyQuran"
                    ),

                dailyHadith:
                    getChecked(
                        "dailyHadith"
                    ),

                dailyDua:
                    getChecked(
                        "dailyDua"
                    ),

                morningAdhkar:
                    getChecked(
                        "morningAdhkar"
                    ),

                eveningAdhkar:
                    getChecked(
                        "eveningAdhkar"
                    ),

                jumuahReminder:
                    getChecked(
                        "jumuahReminder"
                    ),

                ramadanReminder:
                    getChecked(
                        "ramadanReminder"
                    ),

                lastTenNights:
                    getChecked(
                        "lastTenNights"
                    ),

                eidReminder:
                    getChecked(
                        "eidReminder"
                    )

            };


            localStorage.setItem(

                NOTIFICATION_SETTINGS_KEY,

                JSON.stringify(settings)

            );


            /*
            --------------------------------
              REQUEST PERMISSION
            --------------------------------
            */

            if (
                settings.notificationsToggle
            ) {

                requestNotificationPermission();

            }


            alert(
                "Notification settings saved successfully."
            );


            /*
            --------------------------------
              TEST ENGINE IMMEDIATELY
            --------------------------------
            */

            startNotificationEngine();

        }

    );

}


/*
====================================
      SAFE GET CHECKBOX
====================================
*/

function getChecked(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.checked
        : false;

}


/*
====================================
      SAFE GET VALUE
====================================
*/

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value
        : "";

}


/*
====================================
      LOAD SETTINGS
====================================
*/

function loadSettings() {

    const saved =
        localStorage.getItem(
            NOTIFICATION_SETTINGS_KEY
        );

    if (!saved) return;


    try {

        const settings =
            Object.assign(
                getDefaultSettings(),
                JSON.parse(saved)
            );


        setChecked(
            "notificationsToggle",
            settings.notificationsToggle
        );

        setChecked(
            "dndToggle",
            settings.dndToggle
        );

        setChecked(
            "prayerNotifications",
            settings.prayerNotifications
        );

        setChecked(
            "beforePrayerReminder",
            settings.beforePrayerReminder
        );


        setValue(
            "reminderTime",
            settings.reminderTime
        );


        setValue(
            "fajrAdhan",
            settings.fajrAdhan
        );

        setValue(
            "dhuhrAdhan",
            settings.dhuhrAdhan
        );

        setValue(
            "asrAdhan",
            settings.asrAdhan
        );

        setValue(
            "maghribAdhan",
            settings.maghribAdhan
        );

        setValue(
            "ishaAdhan",
            settings.ishaAdhan
        );


        setChecked(
            "dailyQuran",
            settings.dailyQuran
        );

        setChecked(
            "dailyHadith",
            settings.dailyHadith
        );

        setChecked(
            "dailyDua",
            settings.dailyDua
        );

        setChecked(
            "morningAdhkar",
            settings.morningAdhkar
        );

        setChecked(
            "eveningAdhkar",
            settings.eveningAdhkar
        );

        setChecked(
            "jumuahReminder",
            settings.jumuahReminder
        );

        setChecked(
            "ramadanReminder",
            settings.ramadanReminder
        );

        setChecked(
            "lastTenNights",
            settings.lastTenNights
        );

        setChecked(
            "eidReminder",
            settings.eidReminder
        );


    } catch (error) {

        console.error(
            "Notification settings error:",
            error
        );

    }

}


/*
====================================
      SAFE SET CHECKBOX
====================================
*/

function setChecked(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.checked =
            Boolean(value);

    }

}


/*
====================================
      SAFE SET VALUE
====================================
*/

function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element && value !== undefined) {

        element.value =
            value;

    }

}


/*
====================================
      PREVIEW ADHAN
====================================
*/

function setupPreviewButtons() {

    document
        .querySelectorAll(".preview-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const row =
                        button.closest(
                            ".adhan-row"
                        );

                    if (!row) return;


                    const select =
                        row.querySelector(
                            ".adhan-select"
                        );

                    if (!select) return;


                    const audioFile =
                        select.value;

                    if (!audioFile) {

                        alert(
                            "Please select an Adhan first."
                        );

                        return;

                    }


                    playAdhan(
                        audioFile
                    );

                }
            );

        });

}


/*
====================================
      REQUEST NOTIFICATION PERMISSION
====================================
*/

async function requestNotificationPermission() {

    if (
        !("Notification" in window)
    ) {

        console.warn(
            "Notifications are not supported."
        );

        return;

    }


    const settings =
        getNotificationSettings();


    if (
        !settings.notificationsToggle
    ) {

        return;

    }


    if (
        Notification.permission ===
        "default"
    ) {

        try {

            await Notification.requestPermission();

        } catch (error) {

            console.error(
                "Notification permission error:",
                error
            );

        }

    }

}


/*
====================================
      GET SETTINGS
====================================
*/

function getNotificationSettings() {

    const saved =
        localStorage.getItem(
            NOTIFICATION_SETTINGS_KEY
        );


    if (!saved) {

        return getDefaultSettings();

    }


    try {

        return Object.assign(

            getDefaultSettings(),

            JSON.parse(saved)

        );

    } catch (error) {

        console.error(
            "Could not read notification settings:",
            error
        );

        return getDefaultSettings();

    }

}


/*
====================================
      CHECK IF SYSTEM IS ALLOWED
====================================
*/

function notificationsAllowed() {

    const settings =
        getNotificationSettings();


    if (
        !settings.notificationsToggle
    ) {

        return false;

    }


    if (
        settings.dndToggle
    ) {

        return false;

    }


    return true;

}


/*
====================================
      NOTIFICATION ENGINE
====================================
*/

let notificationEngineTimer = null;


function startNotificationEngine() {

    if (notificationEngineTimer) {

        clearInterval(
            notificationEngineTimer
        );

    }


    checkAllNotifications();


    /*
    Check every 30 seconds.

    This means the system does not
    need to wait exactly for a minute
    boundary.
    */

    notificationEngineTimer =
        setInterval(

            checkAllNotifications,

            30000

        );

}


/*
====================================
      CHECK EVERYTHING
====================================
*/

function checkAllNotifications() {

    if (
        !notificationsAllowed()
    ) {

        return;

    }


    checkDailyReminders();

    checkPrayerNotifications();

    checkJumuahReminder();

    checkSpecialIslamicReminders();

}


/*
====================================
      DAILY REMINDERS
====================================
*/

function checkDailyReminders() {

    const settings =
        getNotificationSettings();


    const currentTime =
        getCurrentTime();


    if (
        currentTime !==
        settings.reminderTime
    ) {

        return;

    }


    const today =
        getTodayKey();


    /*
    --------------------------------
      QURAN
    --------------------------------
    */

    if (
        settings.dailyQuran
    ) {

        sendOncePerDay(

            "daily-quran",

            "Daily Quran",

            "Take a moment to read or listen to the Holy Quran."

        );

    }


    /*
    --------------------------------
      HADITH
    --------------------------------
    */

    if (
        settings.dailyHadith
    ) {

        sendOncePerDay(

            "daily-hadith",

            "Daily Hadith",

            "Take a moment to learn and reflect upon a beneficial Hadith."

        );

    }


    /*
    --------------------------------
      DUA
    --------------------------------
    */

    if (
        settings.dailyDua
    ) {

        sendOncePerDay(

            "daily-dua",

            "Daily Dua",

            "Remember Allah and make your daily Du'a."

        );

    }


    /*
    --------------------------------
      MORNING ADHKAR
    --------------------------------
    */

    if (
        settings.morningAdhkar
    ) {

        sendOncePerDay(

            "morning-adhkar",

            "Morning Adhkar",

            "Begin your day with the remembrance of Allah."

        );

    }


    /*
    --------------------------------
      EVENING ADHKAR
    --------------------------------
    */

    if (
        settings.eveningAdhkar
    ) {

        sendOncePerDay(

            "evening-adhkar",

            "Evening Adhkar",

            "Take some time for your evening remembrance."

        );

    }

}


/*
====================================
      PRAYER NOTIFICATIONS
====================================
*/

function checkPrayerNotifications() {

    const settings =
        getNotificationSettings();


    if (
        !settings.prayerNotifications
    ) {

        return;

    }


    /*
    prayer.js publishes its
    prayer times here:

    window.iqranixPrayerTimes
    */

    const times =
        window.iqranixPrayerTimes;


    if (!times) {

        return;

    }


    checkPrayer(

        "Fajr",

        times.Fajr,

        settings.fajrAdhan

    );


    checkPrayer(

        "Dhuhr",

        times.Dhuhr,

        settings.dhuhrAdhan

    );


    checkPrayer(

        "Asr",

        times.Asr,

        settings.asrAdhan

    );


    checkPrayer(

        "Maghrib",

        times.Maghrib,

        settings.maghribAdhan

    );


    checkPrayer(

        "Isha",

        times.Isha,

        settings.ishaAdhan

    );

}


/*
====================================
      CHECK INDIVIDUAL PRAYER
====================================
*/

function checkPrayer(
    prayerName,
    prayerTime,
    adhanFile
) {

    if (!prayerTime) return;


    const prayerClock =
        prayerTime
            .toString()
            .substring(0, 5);


    const currentClock =
        getCurrentTime();


    if (
        prayerClock !==
        currentClock
    ) {

        return;

    }


    const today =
        getTodayKey();


    const historyKey =
        `prayer-${today}-${prayerName}-${prayerClock}`;


    if (
        wasAlreadySent(historyKey)
    ) {

        return;

    }


    /*
    --------------------------------
      ADHAN
    --------------------------------
    */

    if (adhanFile) {

        playAdhan(
            adhanFile
        );

    }


    /*
    --------------------------------
      NOTIFICATION
    --------------------------------
    */

    sendNotification(

        `${prayerName} Prayer`,

        `It is time for ${prayerName} Salah.`

    );


    markAsSent(
        historyKey
    );

}


/*
====================================
      BEFORE-PRAYER REMINDER
====================================
*/

function checkBeforePrayerReminder() {

    const settings =
        getNotificationSettings();


    if (
        !settings.beforePrayerReminder
    ) {

        return;

    }

    /*
      This feature will be connected
      to the exact prayer schedule after
      the user's preferred lead time is
      defined in the Notifications UI.
    */

}


/*
====================================
      PLAY ADHAN
====================================
*/

function playAdhan(audioFile) {

    if (!audioFile) return;


    try {

        const audio =
            new Audio();


        audio.src =
            audioFile;


        audio.preload =
            "auto";


        audio.volume =
            1.0;


        audio.play()

            .then(() => {

                console.log(
                    "Adhan playing:",
                    audioFile
                );

            })

            .catch(error => {

                console.warn(

                    "Browser blocked automatic Adhan playback.",

                    error

                );

                /*
                The browser may require
                previous user interaction
                before allowing audio.
                */

            });


    } catch (error) {

        console.error(
            "Adhan playback error:",
            error
        );

    }

}


/*
====================================
      SEND NOTIFICATION
====================================
*/

function sendNotification(
    title,
    message
) {

    if (
        !notificationsAllowed()
    ) {

        return;

    }


    if (
        !("Notification" in window)
    ) {

        return;

    }


    if (
        Notification.permission !==
        "granted"
    ) {

        return;

    }


    try {

        new Notification(

            `IQRANIX • ${title}`,

            {

                body:
                    message,

                icon:
                    "logo.png",

                badge:
                    "logo.png",

                tag:
                    `iqranix-${title}`

            }

        );


    } catch (error) {

        console.error(
            "Notification error:",
            error
        );

    }

}


/*
====================================
      SEND ONCE PER DAY
====================================
*/

function sendOncePerDay(
    type,
    title,
    message
) {

    const today =
        getTodayKey();


    const key =
        `${type}-${today}`;


    if (
        wasAlreadySent(key)
    ) {

        return;

    }


    sendNotification(
        title,
        message
    );


    markAsSent(key);

}


/*
====================================
      JUMUAH REMINDER
====================================
*/

function checkJumuahReminder() {

    const settings =
        getNotificationSettings();


    if (
        !settings.jumuahReminder
    ) {

        return;

    }


    const now =
        new Date();


    /*
      Friday = 5
    */

    if (
        now.getDay() !== 5
    ) {

        return;

    }


    /*
      09:00 reminder.
      We can later make this
      configurable in Settings.
    */

    if (
        getCurrentTime() !==
        "09:00"
    ) {

        return;

    }


    sendOncePerDay(

        "jumuah",

        "Jumu'ah Reminder",

        "Jumu'ah Mubarak. Remember Allah, send salawat upon the Prophet ﷺ, and prepare for Jumu'ah."

    );

}


/*
====================================
      SPECIAL ISLAMIC REMINDERS
====================================
*/

function checkSpecialIslamicReminders() {

    const settings =
        getNotificationSettings();


    /*
    These switches are already
    stored in Settings.

    Their detailed Islamic calendar
    engine can be connected later
    without changing the storage system.
    */


    if (
        settings.ramadanReminder
    ) {

        /*
        Ramadan calendar integration
        will trigger this reminder.
        */

    }


    if (
        settings.lastTenNights
    ) {

        /*
        Hijri calendar integration
        will trigger this reminder.
        */

    }


    if (
        settings.eidReminder
    ) {

        /*
        Eid calendar integration
        will trigger this reminder.
        */

    }

}


/*
====================================
      PREVENT DUPLICATES
====================================
*/

function wasAlreadySent(key) {

    const saved =
        localStorage.getItem(
            NOTIFICATION_HISTORY_KEY
        );


    if (!saved) {

        return false;

    }


    try {

        const history =
            JSON.parse(saved);


        return history[key] === true;


    } catch {

        return false;

    }

}


/*
====================================
      MARK AS SENT
====================================
*/

function markAsSent(key) {

    let history = {};


    const saved =
        localStorage.getItem(
            NOTIFICATION_HISTORY_KEY
        );


    if (saved) {

        try {

            history =
                JSON.parse(saved);

        } catch {

            history = {};

        }

    }


    history[key] =
        true;


    localStorage.setItem(

        NOTIFICATION_HISTORY_KEY,

        JSON.stringify(history)

    );

}


/*
====================================
      CLEAN OLD HISTORY
====================================
*/

function cleanNotificationHistory() {

    const saved =
        localStorage.getItem(
            NOTIFICATION_HISTORY_KEY
        );


    if (!saved) return;


    try {

        const history =
            JSON.parse(saved);


        const today =
            getTodayKey();


        const cleaned = {};


        Object.keys(history)
            .forEach(key => {

                if (
                    key.includes(today)
                ) {

                    cleaned[key] =
                        true;

                }

            });


        localStorage.setItem(

            NOTIFICATION_HISTORY_KEY,

            JSON.stringify(cleaned)

        );


    } catch {

        localStorage.removeItem(
            NOTIFICATION_HISTORY_KEY
        );

    }

}


/*
====================================
      CURRENT TIME
====================================
*/

function getCurrentTime() {

    const now =
        new Date();


    return (

        String(
            now.getHours()
        ).padStart(2, "0")

        +

        ":"

        +

        String(
            now.getMinutes()
        ).padStart(2, "0")

    );

}


/*
====================================
      TODAY KEY
====================================
*/

function getTodayKey() {

    const now =
        new Date();


    return (

        now.getFullYear()

        +

        "-"

        +

        String(
            now.getMonth() + 1
        ).padStart(2, "0")

        +

        "-"

        +

        String(
            now.getDate()
        ).padStart(2, "0")

    );

}


/*
====================================
      SCROLL ANIMATION
====================================
*/

function setupScrollAnimation() {

    const cards =
        document.querySelectorAll(
            ".settings-card"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("show");

                        } else {

                            entry.target
                                .classList
                                .remove("show");

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    cards.forEach(card => {

        card.classList.add(
            "hidden"
        );

        observer.observe(
            card
        );

    });

}


/*
====================================
      BUTTON EFFECTS
====================================
*/

function setupButtonEffects() {

    document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.style.transform =
                        "scale(.97)";


                    setTimeout(
                        () => {

                            button.style.transform =
                                "";

                        },
                        180
                    );

                }
            );

        });

}


/*
====================================
      READY
====================================
*/

console.log(
    "IQRANIX Notifications Engine Ready."
);