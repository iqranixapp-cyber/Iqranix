/*
====================================
        IQRANIX ABOUT PAGE
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    // Fade in cards on scroll
    const cards = document.querySelectorAll(
        ".content-card, .verse-card, .value-card, .source-card, .feature-item"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    cards.forEach(card => {

        card.classList.add("hidden");

        observer.observe(card);

    });

});


/*
====================================
    Smooth Back Button Effect
====================================
*/

const backButton = document.querySelector(".back-btn");

if (backButton) {

    backButton.addEventListener("click", () => {

        backButton.style.transform = "scale(.92)";

        setTimeout(() => {

            backButton.style.transform = "";

        }, 180);

    });

}


/*
====================================
    Footer Year
====================================
*/

const year = new Date().getFullYear();

const copyright = document.querySelector(".footer small");

if (copyright) {

    copyright.innerHTML =
        `© ${year} Iqranix. All Rights Reserved.`;

}