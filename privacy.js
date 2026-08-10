/*
====================================
        IQRANIX PRIVACY PAGE
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".policy-card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold:0.15

    });

    cards.forEach(card => {

        card.classList.add("hidden");

        observer.observe(card);

    });

});

/*
====================================
        BACK BUTTON EFFECT
====================================
*/

const backButton = document.querySelector(".back-btn");

if(backButton){

    backButton.addEventListener("click",()=>{

        backButton.style.transform="scale(.92)";

        setTimeout(()=>{

            backButton.style.transform="";

        },180);

    });

}

/*
====================================
        FOOTER YEAR
====================================
*/

const year = new Date().getFullYear();

const footer = document.querySelector(".footer small");

if(footer){

    footer.innerHTML=`© ${year} Iqranix. All Rights Reserved.`;

}