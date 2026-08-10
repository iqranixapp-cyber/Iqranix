/*
====================================
        IQRANIX DISCLAIMER
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".disclaimer-card");

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
        BACK BUTTON
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
        HERO PARALLAX
====================================
*/

const hero = document.querySelector(".hero-banner");

window.addEventListener("scroll",()=>{

    if(hero){

        const offset = window.pageYOffset;

        hero.style.transform=`translateY(${offset*0.25}px)`;

    }

});

/*
====================================
        CARD EFFECT
====================================
*/

document.querySelectorAll(".disclaimer-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transition="all .35s ease";

    });

});

/*
====================================
        EMAIL BUTTON
====================================
*/

const emailBtn=document.querySelector(".contact-card a");

if(emailBtn){

    emailBtn.addEventListener("click",()=>{

        emailBtn.style.opacity=".85";

        setTimeout(()=>{

            emailBtn.style.opacity="1";

        },200);

    });

}

/*
====================================
        FOOTER YEAR
====================================
*/

const year=new Date().getFullYear();

const footer=document.querySelector(".footer small");

if(footer){

    footer.innerHTML=`© ${year} Iqranix. All Rights Reserved.`;

}