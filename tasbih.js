"use strict";

/*
=========================================================
IQRANIX — TASBIH COUNTER
tasbih.js

Features:
• Tap counter
• Microphone counter
• Reset
• Target
• Progress
• LocalStorage
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("IQRANIX Tasbih JS started");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const countDisplay = document.getElementById("countDisplay");
    const targetDisplay = document.getElementById("targetDisplay");

    const tapButton = document.getElementById("tapButton");
    const resetButton = document.getElementById("resetButton");
    const microphoneButton =
        document.getElementById("microphoneButton");

    const targetInput = document.getElementById("targetInput");
    const dhikrSelect = document.getElementById("dhikrSelect");

    const progressBar = document.getElementById("progressBar");
    const statusText = document.getElementById("statusText");

    const backButton = document.getElementById("backButton");
    const toast = document.getElementById("toast");


    /* =====================================================
       CHECK HTML
    ===================================================== */

    console.log("Tap button:", tapButton);
    console.log("Reset button:", resetButton);
    console.log("Microphone button:", microphoneButton);
    console.log("Count display:", countDisplay);


    /* =====================================================
       STORAGE
    ===================================================== */

    const COUNT_KEY = "iqranix-tasbih-count";
    const TARGET_KEY = "iqranix-tasbih-target";
    const DHIKR_KEY = "iqranix-tasbih-dhikr";


    /* =====================================================
       STATE
    ===================================================== */

    let count =
        parseInt(
            localStorage.getItem(COUNT_KEY),
            10
        ) || 0;

    let target =
        parseInt(
            localStorage.getItem(TARGET_KEY),
            10
        ) || 33;

    let listening = false;
    let recognition = null;


    /* =====================================================
       DISPLAY
    ===================================================== */

    function updateDisplay() {

        if (countDisplay) {
            countDisplay.textContent = count;
        }

        if (targetDisplay) {
            targetDisplay.textContent = target;
        }

        if (targetInput) {
            targetInput.value = target;
        }

        updateProgress();

        save();

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        if (!progressBar) {
            return;
        }

        if (target <= 0) {
            progressBar.style.width = "0%";
            return;
        }

        const percentage =
            Math.min(
                100,
                (count / target) * 100
            );

        progressBar.style.width =
            percentage + "%";
    }


    /* =====================================================
       SAVE
    ===================================================== */

    function save() {

        localStorage.setItem(
            COUNT_KEY,
            String(count)
        );

        localStorage.setItem(
            TARGET_KEY,
            String(target)
        );

        if (dhikrSelect) {

            localStorage.setItem(
                DHIKR_KEY,
                dhikrSelect.value
            );

        }

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!toast) {
            console.log(message);
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 1500);

    }


    /* =====================================================
       ADD COUNT
    ===================================================== */

    function addCount(amount) {

        amount =
            parseInt(amount, 10) || 1;

        count += amount;

        updateDisplay();

        /* Phone vibration */

        if (
            navigator.vibrate &&
            amount === 1
        ) {
            navigator.vibrate(20);
        }

        /* Target */

        if (
            target > 0 &&
            count === target
        ) {

            showToast(
                "🤲 Alhamdulillah! Target reached."
            );

            if (navigator.vibrate) {
                navigator.vibrate([
                    80,
                    50,
                    80
                ]);
            }

        } else {

            showToast(
                "+" + amount
            );

        }

    }


    /* =====================================================
       TAP BUTTON
    ===================================================== */

    if (tapButton) {

        tapButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                addCount(1);

            }
        );

    } else {

        console.error(
            "ERROR: #tapButton was not found."
        );

    }


    /* =====================================================
       RESET
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                count = 0;

                updateDisplay();

                showToast(
                    "Counter reset"
                );

            }
        );

    }


    /* =====================================================
       TARGET
    ===================================================== */

    if (targetInput) {

        targetInput.addEventListener(
            "change",
            function () {

                let value =
                    parseInt(
                        targetInput.value,
                        10
                    );

                if (
                    !Number.isFinite(value) ||
                    value < 1
                ) {
                    value = 33;
                }

                target = value;

                updateDisplay();

            }
        );

    }


    /* =====================================================
       DHIKR SELECT
    ===================================================== */

    if (dhikrSelect) {

        const saved =
            localStorage.getItem(
                DHIKR_KEY
            );

        if (saved) {
            dhikrSelect.value = saved;
        }


        dhikrSelect.addEventListener(
            "change",
            function () {

                save();

                showToast(
                    "Dhikr selected"
                );

            }
        );

    }


    /* =====================================================
       MICROPHONE
    ===================================================== */

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        console.warn(
            "Speech recognition is not supported."
        );

        if (microphoneButton) {

            microphoneButton.addEventListener(
                "click",
                function () {

                    showToast(
                        "Voice counting is not supported in this browser."
                    );

                }
            );

        }

    } else {

        recognition =
            new SpeechRecognition();

        recognition.continuous = true;

        recognition.interimResults = false;

        recognition.lang = "en-US";


        /* START */

        recognition.onstart =
            function () {

                listening = true;

                if (microphoneButton) {

                    microphoneButton.classList.add(
                        "listening"
                    );

                    microphoneButton.textContent =
                        "🛑 Stop Listening";

                }

                if (statusText) {

                    statusText.textContent =
                        "🎤 Listening... Say the dhikr.";

                }

            };


        /* STOP */

        recognition.onend =
            function () {

                listening = false;

                if (microphoneButton) {

                    microphoneButton.classList.remove(
                        "listening"
                    );

                    microphoneButton.textContent =
                        "🎤 Count with Microphone";

                }

                if (statusText) {

                    statusText.textContent =
                        "Tap the microphone to start.";

                }

            };


        /* RESULT */

        recognition.onresult =
            function (event) {

                for (
                    let i = event.resultIndex;
                    i < event.results.length;
                    i++
                ) {

                    if (
                        !event.results[i].isFinal
                    ) {
                        continue;
                    }

                    const text =
                        event.results[i][0]
                            .transcript
                            .trim()
                            .toLowerCase();

                    console.log(
                        "Heard:",
                        text
                    );


                    /*
                     * If a number is spoken,
                     * add that number.
                     */

                    const number =
                        getNumber(text);

                    if (number !== null) {

                        addCount(number);

                        continue;

                    }


                    /*
                     * Otherwise recognize
                     * common dhikr.
                     */

                    if (
                        text.includes("subhanallah") ||
                        text.includes("subhan allah") ||
                        text.includes("alhamdulillah") ||
                        text.includes("alhamdu lillah") ||
                        text.includes("allahu akbar") ||
                        text.includes("allah akbar") ||
                        text.includes("astaghfirullah") ||
                        text.includes("astaghfir allah")
                    ) {

                        addCount(1);

                    }

                }

            };


        /* ERROR */

        recognition.onerror =
            function (event) {

                console.error(
                    "Speech recognition:",
                    event.error
                );

                if (statusText) {

                    statusText.textContent =
                        "🎤 Microphone error: " +
                        event.error;

                }

            };


        /* BUTTON */

        if (microphoneButton) {

            microphoneButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (listening) {

                        recognition.stop();

                        return;

                    }


                    try {

                        recognition.start();

                    } catch (error) {

                        console.error(
                            error
                        );

                    }

                }
            );

        }

    }


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

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


    /* =====================================================
       SPACEBAR
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.code === "Space" &&
                document.activeElement.tagName !== "INPUT" &&
                document.activeElement.tagName !== "SELECT"
            ) {

                event.preventDefault();

                addCount(1);

            }

        }
    );


    /* =====================================================
       START
    ===================================================== */

    updateDisplay();

    console.log(
        "IQRANIX Tasbih ready."
    );

});