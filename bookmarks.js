/* =========================================================
   IQRANIX — BOOKMARKS.JS
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE KEY
   ========================================================= */

const BOOKMARK_STORAGE_KEY = "iqranixBookmarks";


/* =========================================================
   ELEMENTS
   ========================================================= */

let bookmarksList;
let emptyState;
let bookmarkCount;
let filterButtons;
let clearButton;


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    bookmarksList =
        document.getElementById("bookmarksList");

    emptyState =
        document.getElementById("emptyState");

    bookmarkCount =
        document.getElementById("bookmarkCount");

    filterButtons =
        document.querySelectorAll(".filter-button");

    clearButton =
        document.getElementById("clearBookmarks");


    setupFilters();

    setupClearButton();

    displayBookmarks();

});


/* =========================================================
   GET BOOKMARKS
   ========================================================= */

function getBookmarks() {

    try {

        const saved =
            localStorage.getItem(BOOKMARK_STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const bookmarks = JSON.parse(saved);

        return Array.isArray(bookmarks)
            ? bookmarks
            : [];

    } catch (error) {

        console.error(
            "Iqranix bookmarks error:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE BOOKMARKS
   ========================================================= */

function saveBookmarks(bookmarks) {

    localStorage.setItem(
        BOOKMARK_STORAGE_KEY,
        JSON.stringify(bookmarks)
    );

}


/* =========================================================
   DISPLAY BOOKMARKS
   ========================================================= */

function displayBookmarks(category = "all") {

    if (!bookmarksList) return;

    const bookmarks = getBookmarks();

    let filteredBookmarks = bookmarks;

    if (category !== "all") {

        filteredBookmarks =
            bookmarks.filter(bookmark =>
                String(bookmark.type || "").toLowerCase() ===
                category.toLowerCase()
            );

    }


    bookmarksList.innerHTML = "";


    updateBookmarkCount(
        filteredBookmarks.length,
        bookmarks.length
    );


    if (filteredBookmarks.length === 0) {

        showEmptyState();

        return;

    }


    hideEmptyState();


    filteredBookmarks.forEach((bookmark, index) => {

        const card =
            createBookmarkCard(
                bookmark,
                index
            );

        bookmarksList.appendChild(card);

    });

}


/* =========================================================
   CREATE BOOKMARK CARD
   ========================================================= */

function createBookmarkCard(bookmark, index) {

    const card =
        document.createElement("article");

    card.className = "bookmark-card";


    const icon =
        getBookmarkIcon(bookmark.type);


    const type =
        escapeHTML(
            bookmark.type || "Saved"
        );


    const title =
        escapeHTML(
            bookmark.title || "Saved Content"
        );


    const text =
        escapeHTML(
            bookmark.text ||
            bookmark.description ||
            ""
        );


    const arabic =
        bookmark.arabic
            ? escapeHTML(bookmark.arabic)
            : "";


    card.innerHTML = `

        <div class="bookmark-type-icon">

            <i class="${icon}"></i>

        </div>


        <div class="bookmark-content">

            <span class="bookmark-type">

                ${type}

            </span>


            <h3 class="bookmark-title">

                ${title}

            </h3>


            ${
                arabic
                    ? `
                        <div class="bookmark-arabic">

                            ${arabic}

                        </div>
                      `
                    : ""
            }


            ${
                text
                    ? `
                        <p class="bookmark-text">

                            ${text}

                        </p>
                      `
                    : ""
            }

        </div>


        <div class="bookmark-actions">

            <button
                class="bookmark-action delete"
                type="button"
                title="Remove bookmark"
                aria-label="Remove bookmark"
                data-index="${index}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

    `;


    const deleteButton =
        card.querySelector(".delete");


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                removeBookmark(
                    bookmark.id
                );

            }
        );

    }


    return card;

}


/* =========================================================
   REMOVE BOOKMARK
   ========================================================= */

function removeBookmark(id) {

    let bookmarks =
        getBookmarks();


    const updated =
        bookmarks.filter(
            bookmark =>
                String(bookmark.id) !==
                String(id)
        );


    saveBookmarks(updated);

    displayBookmarks();


}


/* =========================================================
   CLEAR ALL BOOKMARKS
   ========================================================= */

function setupClearButton() {

    if (!clearButton) return;


    clearButton.addEventListener(
        "click",
        () => {

            const bookmarks =
                getBookmarks();


            if (bookmarks.length === 0) {

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to remove all bookmarks?"
                );


            if (!confirmed) return;


            localStorage.removeItem(
                BOOKMARK_STORAGE_KEY
            );


            displayBookmarks();

        }
    );

}


/* =========================================================
   FILTERS
   ========================================================= */

function setupFilters() {

    if (!filterButtons) return;


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.filter ||
                    "all";


                displayBookmarks(
                    category
                );

            }
        );

    });

}


/* =========================================================
   BOOKMARK COUNT
   ========================================================= */

function updateBookmarkCount(
    visibleCount,
    totalCount
) {

    if (!bookmarkCount) return;


    if (visibleCount === totalCount) {

        bookmarkCount.innerHTML = `

            <i class="fa-solid fa-bookmark"></i>

            ${totalCount}
            ${totalCount === 1 ? "bookmark" : "bookmarks"}

        `;

        return;

    }


    bookmarkCount.innerHTML = `

        <i class="fa-solid fa-bookmark"></i>

        ${visibleCount}
        of
        ${totalCount}
        bookmarks

    `;

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function showEmptyState() {

    if (emptyState) {

        emptyState.classList.add(
            "show"
        );

    }

}


function hideEmptyState() {

    if (emptyState) {

        emptyState.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   ICONS
   ========================================================= */

function getBookmarkIcon(type) {

    const value =
        String(type || "").toLowerCase();


    if (
        value.includes("quran") ||
        value.includes("surah")
    ) {

        return "fa-solid fa-book-quran";

    }


    if (
        value.includes("dua") ||
        value.includes("adhkar")
    ) {

        return "fa-solid fa-hands-praying";

    }


    if (
        value.includes("hadith")
    ) {

        return "fa-solid fa-scroll";

    }


    if (
        value.includes("seerah") ||
        value.includes("prophet")
    ) {

        return "fa-solid fa-book-open";

    }


    if (
        value.includes("fiqh")
    ) {

        return "fa-solid fa-scale-balanced";

    }


    if (
        value.includes("article") ||
        value.includes("knowledge")
    ) {

        return "fa-solid fa-lightbulb";

    }


    return "fa-solid fa-bookmark";

}


/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   GLOBAL BOOKMARK FUNCTION
   =========================================================

   Other IQRANIX pages can call:

   addIqranixBookmark({
       type: "Quran",
       title: "Al-Fatihah",
       arabic: "...",
       text: "..."
   });

   ========================================================= */

window.addIqranixBookmark = function(data) {

    if (!data || typeof data !== "object") {

        console.error(
            "Invalid Iqranix bookmark data."
        );

        return false;

    }


    const bookmarks =
        getBookmarks();


    const newBookmark = {

        id:
            data.id ||
            (
                Date.now().toString() +
                Math.random()
                    .toString(36)
                    .substring(2)
            ),

        type:
            data.type ||
            "Saved",

        title:
            data.title ||
            "Saved Content",

        arabic:
            data.arabic ||
            "",

        text:
            data.text ||
            data.description ||
            "",

        url:
            data.url ||
            "",

        createdAt:
            new Date().toISOString()

    };


    /*
       Prevent duplicate bookmarks
       when the same ID already exists.
    */

    const existingIndex =
        bookmarks.findIndex(
            bookmark =>
                String(bookmark.id) ===
                String(newBookmark.id)
        );


    if (existingIndex !== -1) {

        bookmarks[existingIndex] =
            newBookmark;

    } else {

        bookmarks.unshift(
            newBookmark
        );

    }


    saveBookmarks(bookmarks);


    return true;

};


/* =========================================================
   GLOBAL REMOVE FUNCTION
   ========================================================= */

window.removeIqranixBookmark = function(id) {

    removeBookmark(id);

};


/* =========================================================
   GLOBAL CHECK FUNCTION
   ========================================================= */

window.isIqranixBookmarked = function(id) {

    const bookmarks =
        getBookmarks();


    return bookmarks.some(
        bookmark =>
            String(bookmark.id) ===
            String(id)
    );

};


/* =========================================================
   REFRESH WHEN PAGE BECOMES VISIBLE
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            displayBookmarks();

        }

    }
);


/* =========================================================
   READY
   ========================================================= */

console.log(
    "IQRANIX Bookmarks Loaded Successfully."
);