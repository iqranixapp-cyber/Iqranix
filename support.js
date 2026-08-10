"use strict";

/*
=========================================================
        IQRANIX — SUPPORT
        PAYPAL LIVE VERSION
=========================================================

IMPORTANT:
- This uses your PayPal LIVE Client ID.
- NEVER put the PayPal Client Secret in frontend code.
- Payments made through this version are REAL payments.
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAYPAL LIVE CONFIG
    ===================================================== */

    const PAYPAL_CLIENT_ID =
        "AZ8iUm8Er1aWCPvUtw3v56D7nhR0vsQ8NZHutNVA6CCZrJiL9btpCaozYLhGLO7M-AHXmppIAt2AVV1p";

    const DEFAULT_AMOUNT = "5.00";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const backButton =
        document.getElementById("backButton");

    const continuePaypalButton =
        document.getElementById("continuePaypalButton");

    const mpesaButton =
        document.getElementById("mpesaButton");

    const paypalModal =
        document.getElementById("paypalModal");

    const paypalOverlay =
        document.getElementById("paypalOverlay");

    const closePaypalModal =
        document.getElementById("closePaypalModal");

    const paypalContainer =
        document.getElementById("paypal-button-container");

    const paypalStatus =
        document.getElementById("paypalStatus");

    const selectedAmountDisplay =
        document.getElementById("selectedAmountDisplay");

    const toast =
        document.getElementById("toast");

    const amountButtons =
        document.querySelectorAll(".amount-button");


    /* =====================================================
       STATE
    ===================================================== */

    let selectedAmount = DEFAULT_AMOUNT;

    let paypalButtonsRendered = false;

    let paypalRendering = false;


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    }


    /* =====================================================
       STATUS
    ===================================================== */

    function setStatus(message) {

        if (!paypalStatus) return;

        paypalStatus.textContent = message;

    }


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    if (backButton) {

        backButton.addEventListener("click", () => {

            if (window.history.length > 1) {

                window.history.back();

            } else {

                window.location.href = "index.html";

            }

        });

    }


    /* =====================================================
       OPEN PAYPAL MODAL
    ===================================================== */

    function openPaypalModal() {

        if (!paypalModal) {

            console.error(
                "PayPal modal not found."
            );

            return;

        }

        paypalModal.classList.add("open");

        paypalModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";


        if (!paypalButtonsRendered) {

            waitForPayPal();

        }

    }


    /* =====================================================
       CLOSE PAYPAL MODAL
    ===================================================== */

    function closePaypal() {

        if (!paypalModal) return;

        paypalModal.classList.remove("open");

        paypalModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    /* =====================================================
       CONTINUE WITH PAYPAL
    ===================================================== */

    if (continuePaypalButton) {

        continuePaypalButton.addEventListener(
            "click",
            openPaypalModal
        );

    } else {

        console.error(
            "continuePaypalButton not found."
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closePaypalModal) {

        closePaypalModal.addEventListener(
            "click",
            closePaypal
        );

    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    if (paypalOverlay) {

        paypalOverlay.addEventListener(
            "click",
            closePaypal
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closePaypal();

        }

    });


    /* =====================================================
       AMOUNT BUTTONS
    ===================================================== */

    amountButtons.forEach(button => {

        button.addEventListener("click", () => {

            amountButtons.forEach(item => {

                item.classList.remove("active");

            });


            button.classList.add("active");


            selectedAmount =
                button.dataset.amount ||
                DEFAULT_AMOUNT;


            if (selectedAmountDisplay) {

                selectedAmountDisplay.textContent =
                    `$${selectedAmount}`;

            }


            setStatus(
                `Selected contribution: $${selectedAmount}`
            );

        });

    });


    /* =====================================================
       INITIAL AMOUNT
    ===================================================== */

    if (selectedAmountDisplay) {

        selectedAmountDisplay.textContent =
            `$${selectedAmount}`;

    }


    /* =====================================================
       WAIT FOR PAYPAL SDK
    ===================================================== */

    function waitForPayPal() {

        if (
            typeof window.paypal !==
            "undefined"
        ) {

            renderPayPalButtons();

            return;

        }


        setStatus(
            "Loading secure PayPal checkout..."
        );


        let attempts = 0;


        const timer = setInterval(() => {

            attempts++;


            if (
                typeof window.paypal !==
                "undefined"
            ) {

                clearInterval(timer);

                renderPayPalButtons();

                return;

            }


            if (attempts >= 50) {

                clearInterval(timer);

                setStatus(
                    "PayPal could not be loaded. Please check your internet connection."
                );

                showToast(
                    "PayPal could not be loaded."
                );

            }

        }, 200);

    }


    /* =====================================================
       RENDER PAYPAL LIVE BUTTONS
    ===================================================== */

    function renderPayPalButtons() {

        if (paypalButtonsRendered) return;

        if (paypalRendering) return;


        if (
            typeof window.paypal ===
            "undefined"
        ) {

            setStatus(
                "PayPal SDK is not available."
            );

            return;

        }


        if (!paypalContainer) {

            console.error(
                "paypal-button-container not found."
            );

            setStatus(
                "PayPal payment container is missing."
            );

            return;

        }


        paypalRendering = true;

        paypalContainer.innerHTML = "";


        try {

            const buttons =
                window.paypal.Buttons({

                    /* =====================================
                       BUTTON STYLE
                    ===================================== */

                    style: {

                        layout: "vertical",

                        shape: "rect",

                        color: "gold",

                        label: "paypal",

                        height: 48

                    },


                    /* =====================================
                       CREATE LIVE ORDER
                    ===================================== */

                    createOrder: function (
                        data,
                        actions
                    ) {

                        console.log(
                            "Creating LIVE PayPal order:",
                            selectedAmount
                        );


                        setStatus(
                            "Creating secure PayPal payment..."
                        );


                        if (
                            !actions ||
                            !actions.order
                        ) {

                            throw new Error(
                                "PayPal order actions are unavailable."
                            );

                        }


                        return actions.order.create({

                            intent: "CAPTURE",

                            purchase_units: [

                                {

                                    description:
                                        "Support IQRANIX",

                                    amount: {

                                        currency_code:
                                            "USD",

                                        value:
                                            selectedAmount

                                    }

                                }

                            ]

                        });

                    },


                    /* =====================================
                       PAYMENT APPROVED
                    ===================================== */

                    onApprove: function (
                        data,
                        actions
                    ) {

                        console.log(
                            "LIVE PayPal order approved:",
                            data
                        );


                        setStatus(
                            "Completing your payment..."
                        );


                        if (
                            !actions ||
                            !actions.order
                        ) {

                            setStatus(
                                "Unable to complete the PayPal payment."
                            );

                            return;

                        }


                        return actions.order
                            .capture()

                            .then(details => {

                                console.log(
                                    "LIVE PayPal payment completed:",
                                    details
                                );


                                setStatus(
                                    "Payment completed successfully!"
                                );


                                showToast(
                                    "JazakAllahu Khayran! Thank you for supporting IQRANIX. 💚"
                                );


                                setTimeout(() => {

                                    closePaypal();

                                }, 2500);

                            })

                            .catch(error => {

                                console.error(
                                    "PayPal LIVE capture error:",
                                    error
                                );


                                setStatus(
                                    "Payment could not be completed."
                                );


                                showToast(
                                    "PayPal payment failed."
                                );

                            });

                    },


                    /* =====================================
                       PAYMENT CANCELLED
                    ===================================== */

                    onCancel: function(data) {

                        console.log(
                            "PayPal payment cancelled:",
                            data
                        );


                        setStatus(
                            "Payment cancelled."
                        );

                    },


                    /* =====================================
                       PAYPAL ERROR
                    ===================================== */

                    onError: function(error) {

                        console.error(
                            "================================"
                        );

                        console.error(
                            "PAYPAL LIVE CHECKOUT ERROR"
                        );

                        console.error(error);

                        console.error(
                            "================================"
                        );


                        setStatus(
                            "PayPal encountered an error. Please try again."
                        );


                        showToast(
                            "PayPal checkout error."
                        );

                    },


                    /* =====================================
                       BUTTON CLICK
                    ===================================== */

                    onClick: function() {

                        console.log(
                            "PayPal LIVE button clicked."
                        );

                        console.log(
                            "Amount:",
                            selectedAmount
                        );

                    }

                });


            /* =============================================
               CHECK ELIGIBILITY
            ============================================= */

            if (!buttons.isEligible()) {

                paypalRendering = false;

                setStatus(
                    "PayPal buttons are not available."
                );

                console.error(
                    "PayPal LIVE Buttons are not eligible."
                );

                return;

            }


            /* =============================================
               RENDER
            ============================================= */

            buttons
                .render(
                    "#paypal-button-container"
                )

                .then(() => {

                    paypalButtonsRendered = true;

                    paypalRendering = false;

                    setStatus("");

                    console.log(
                        "✓ PayPal LIVE buttons rendered successfully."
                    );

                })

                .catch(error => {

                    paypalRendering = false;

                    console.error(
                        "PayPal LIVE render error:",
                        error
                    );

                    setStatus(
                        "Unable to display PayPal checkout."
                    );

                    showToast(
                        "Unable to display PayPal."
                    );

                });


        } catch (error) {

            paypalRendering = false;

            console.error(
                "PayPal LIVE initialization error:",
                error
            );

            setStatus(
                "PayPal could not be initialized."
            );

        }

    }


    /* =====================================================
       M-PESA
    ===================================================== */

    if (mpesaButton) {

        mpesaButton.addEventListener(
            "click",
            () => {

                showToast(
                    "M-Pesa support will be connected next."
                );

            }
        );

    }


    /* =====================================================
       FINAL LOG
    ===================================================== */

    console.log(
        "========================================"
    );

    console.log(
        "IQRANIX Support loaded."
    );

    console.log(
        "PayPal LIVE mode enabled."
    );

    console.log(
        "PayPal Client ID loaded."
    );

    console.log(
        "Default contribution:",
        selectedAmount
    );

    console.log(
        "========================================"
    );

});