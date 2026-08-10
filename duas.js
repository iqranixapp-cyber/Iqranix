"use strict";

/*
 * =========================================================
 * IQRANIX — DAILY DUAS
 * =========================================================
 *
 * Reads dua data from:
 *     window.DUAS
 *
 * Works with the existing long duas-data.js file.
 *
 * Features:
 *  - Search
 *  - Category filtering
 *  - Category colours
 *  - Dua of the Day
 *  - Random Dua
 *  - Favorites
 *  - Statistics
 *  - Mobile friendly
 *  - Safe HTML rendering
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATA
       ===================================================== */

    const duas = Array.isArray(window.DUAS)
        ? window.DUAS
        : [];


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const searchInput =
        document.getElementById("duaSearch");

    const categorySelect =
        document.getElementById("categorySelect");

    const duasList =
        document.getElementById("duasList");

    const featuredDua =
        document.getElementById("featuredDua");

    const totalDuas =
        document.getElementById("totalDuas");

    const favoriteCount =
        document.getElementById("favoriteCount");

    const categoryCount =
        document.getElementById("categoryCount");

    const resultsText =
        document.getElementById("resultsText");

    const noResults =
        document.getElementById("noResults");

    const randomButton =
        document.getElementById("randomDuaButton");

    const favoritesButton =
        document.getElementById("favoritesButton");

    const backButton =
        document.getElementById("backButton");


    /* =====================================================
       FAVORITES
       ===================================================== */

    let favorites = [];

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "iqranix-dua-favorites"
                ) || "[]"
            );

        if (Array.isArray(saved)) {
            favorites = saved;
        }

    } catch (error) {

        console.warn(
            "Could not read saved favorites.",
            error
        );

        favorites = [];

    }


    let showingFavorites = false;


    /* =====================================================
       BASIC CHECK
       ===================================================== */

    console.log(
        "IQRANIX Duas loaded:",
        duas.length
    );


    if (!duas.length) {

        if (duasList) {

            duasList.innerHTML = `
                <div class="duas-empty">
                    <div class="duas-empty-icon">📖</div>

                    <h3>No Dua Data</h3>

                    <p>
                        No dua data could be loaded.
                        Please check duas-data.js.
                    </p>
                </div>
            `;

        }

        if (featuredDua) {

            featuredDua.innerHTML = `
                <div class="duas-empty">
                    <div class="duas-empty-icon">✨</div>

                    <p>
                        Loading today's dua...
                    </p>
                </div>
            `;

        }

        return;
    }


    /* =====================================================
       BACK BUTTON
       ===================================================== */

    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                if (window.history.length > 1) {

                    window.history.back();

                } else {

                    window.location.href =
                        "index.html";

                }

            }
        );

    }


    /* =====================================================
       SAVE FAVORITES
       ===================================================== */

    function saveFavorites() {

        try {

            localStorage.setItem(
                "iqranix-dua-favorites",
                JSON.stringify(favorites)
            );

        } catch (error) {

            console.warn(
                "Could not save favorites.",
                error
            );

        }

    }


    /* =====================================================
       CHECK FAVORITE
       ===================================================== */

    function isFavorite(id) {

        return favorites.includes(id);

    }


    /* =====================================================
       TOGGLE FAVORITE
       ===================================================== */

    function toggleFavorite(id) {

        if (isFavorite(id)) {

            favorites =
                favorites.filter(
                    favoriteId =>
                        favoriteId !== id
                );

            showToast("Removed from favorites");

        } else {

            favorites.push(id);

            showToast("Added to favorites ⭐");

        }


        saveFavorites();

        updateStats();

        renderDuas();

    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        let toast =
            document.querySelector(".dua-toast");


        if (!toast) {

            toast =
                document.createElement("div");

            toast.className =
                "dua-toast";

            document.body.appendChild(toast);

        }


        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            toast._timeout
        );


        toast._timeout =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2200);

    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        if (
            value === undefined ||
            value === null
        ) {

            return "";

        }


        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       GET CATEGORY
       ===================================================== */

    function getCategory(dua) {

        return String(
            dua.category ||
            "general"
        ).toLowerCase();

    }


    /* =====================================================
       CATEGORY COLOUR
       ===================================================== */

    function getColorClass(dua) {

        const category =
            getCategory(dua);


        /*
         * Protection / safety
         */

        if (
            category.includes("protect") ||
            category.includes("safety") ||
            category.includes("fear")
        ) {

            return "color-blue";

        }


        /*
         * Morning / evening / daily
         */

        if (
            category.includes("morning") ||
            category.includes("evening") ||
            category.includes("daily")
        ) {

            return "color-gold";

        }


        /*
         * Prayer / worship
         */

        if (
            category.includes("prayer") ||
            category.includes("worship") ||
            category.includes("fast")
        ) {

            return "color-green";

        }


        /*
         * Peace / wellbeing
         */

        if (
            category.includes("peace") ||
            category.includes("health") ||
            category.includes("well")
        ) {

            return "color-teal";

        }


        /*
         * Hereafter
         */

        if (
            category.includes("afterlife") ||
            category.includes("hereafter") ||
            category.includes("paradise") ||
            category.includes("death")
        ) {

            return "color-purple";

        }


        /*
         * Family / relationships
         */

        if (
            category.includes("family") ||
            category.includes("marriage") ||
            category.includes("love") ||
            category.includes("parent")
        ) {

            return "color-pink";

        }


        /*
         * Travel
         */

        if (
            category.includes("travel") ||
            category.includes("journey")
        ) {

            return "color-blue";

        }


        /*
         * Food
         */

        if (
            category.includes("food") ||
            category.includes("eat") ||
            category.includes("drink")
        ) {

            return "color-gold";

        }


        /*
         * Forgiveness
         */

        if (
            category.includes("forgive") ||
            category.includes("repent")
        ) {

            return "color-purple";

        }


        /*
         * Default
         */

        return "color-green";

    }


    /* =====================================================
       UPDATE STATISTICS
       ===================================================== */

    function updateStats() {

        if (totalDuas) {

            totalDuas.textContent =
                duas.length;

        }


        if (favoriteCount) {

            favoriteCount.textContent =
                favorites.length;

        }


        const categories =
            new Set(
                duas
                    .map(
                        dua =>
                            dua &&
                            (
                                dua.category ||
                                dua.categoryName
                            )
                    )
                    .filter(Boolean)
            );


        if (categoryCount) {

            categoryCount.textContent =
                categories.size;

        }

    }


    /* =====================================================
       SEARCH + FILTER
       ===================================================== */

    function getFilteredDuas() {

        const searchTerm =
            (
                searchInput?.value ||
                ""
            )
                .trim()
                .toLowerCase();


        const selectedCategory =
            categorySelect?.value ||
            "all";


        return duas.filter(
            dua => {

                if (!dua) {

                    return false;

                }


                /*
                 * Category filter
                 */

                if (
                    selectedCategory !== "all"
                ) {

                    const duaCategory =
                        String(
                            dua.category ||
                            ""
                        ).toLowerCase();


                    const duaCategoryName =
                        String(
                            dua.categoryName ||
                            ""
                        ).toLowerCase();


                    const selected =
                        String(
                            selectedCategory
                        ).toLowerCase();


                    if (
                        duaCategory !== selected &&
                        duaCategoryName !== selected
                    ) {

                        return false;

                    }

                }


                /*
                 * Favorites filter
                 */

                if (
                    showingFavorites &&
                    !favorites.includes(
                        dua.id
                    )
                ) {

                    return false;

                }


                /*
                 * Search
                 */

                if (!searchTerm) {

                    return true;

                }


                const searchableText = [

                    dua.id,
                    dua.title,
                    dua.category,
                    dua.categoryName,
                    dua.arabic,
                    dua.transliteration,
                    dua.translation,
                    dua.source

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return searchableText.includes(
                    searchTerm
                );

            }
        );

    }


    /* =====================================================
       CREATE DUA CARD
       ===================================================== */

    function createDuaCard(dua, index) {

        const favorite =
            isFavorite(dua.id);


        /*
         * IMPORTANT:
         *
         * This adds:
         *
         * color-green
         * color-purple
         * color-blue
         * color-gold
         * color-pink
         * color-teal
         *
         * so your existing CSS colours work.
         */

        const colorClass =
            getColorClass(dua);


        const categoryName =
            dua.categoryName ||
            dua.category ||
            "General";


        return `

            <article
                class="dua-card ${colorClass}"
                data-dua-id="${escapeHTML(dua.id)}"
            >

                <div class="dua-card-top">

                    <span class="dua-category-label">

                        ${escapeHTML(
                            categoryName
                        )}

                    </span>


                    <div class="dua-number">

                        ${index + 1}

                    </div>

                </div>


                <h3 class="dua-title">

                    ${escapeHTML(
                        dua.title ||
                        "Daily Dua"
                    )}

                </h3>


                <div
                    class="dua-arabic"
                    dir="rtl"
                    lang="ar"
                >

                    ${escapeHTML(
                        dua.arabic
                    )}

                </div>


                ${
                    dua.transliteration
                    ? `
                        <div
                            class="dua-transliteration"
                        >

                            ${escapeHTML(
                                dua.transliteration
                            )}

                        </div>
                    `
                    : ""
                }


                <div class="dua-translation">

                    <div class="dua-translation-title">

                        Translation

                    </div>

                    ${escapeHTML(
                        dua.translation
                    )}

                </div>


                ${
                    dua.source
                    ? `
                        <div class="dua-source">

                            📖
                            <strong>
                                Source:
                            </strong>

                            ${escapeHTML(
                                dua.source
                            )}

                        </div>
                    `
                    : ""
                }


                <div class="dua-actions">

                    <button
                        type="button"
                        class="dua-action favorite-button ${
                            favorite
                                ? "bookmarked"
                                : ""
                        }"
                        data-favorite="${escapeHTML(
                            dua.id
                        )}"
                        aria-label="${
                            favorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }"
                    >

                        ${
                            favorite
                                ? "⭐ Saved"
                                : "☆ Favorite"
                        }

                    </button>

                </div>

            </article>

        `;

    }


    /* =====================================================
       RENDER DUA LIST
       ===================================================== */

    function renderDuas() {

        const filtered =
            getFilteredDuas();


        /*
         * Results text
         */

        if (resultsText) {

            if (showingFavorites) {

                resultsText.textContent =
                    `Showing ${
                        filtered.length
                    } favorite dua${
                        filtered.length === 1
                            ? ""
                            : "s"
                    }`;

            } else {

                resultsText.textContent =
                    `Showing ${
                        filtered.length
                    } dua${
                        filtered.length === 1
                            ? ""
                            : "s"
                    }`;

            }

        }


        /*
         * No results
         */

        if (!filtered.length) {

            if (duasList) {

                duasList.innerHTML = "";

            }


            if (noResults) {

                noResults.classList.remove(
                    "hidden"
                );

            }

            return;

        }


        if (noResults) {

            noResults.classList.add(
                "hidden"
            );

        }


        /*
         * Render cards
         */

        if (duasList) {

            duasList.innerHTML =
                filtered
                    .map(
                        (dua, index) =>
                            createDuaCard(
                                dua,
                                index
                            )
                    )
                    .join("");

        }


        /*
         * Favorite buttons
         */

        document
            .querySelectorAll(
                "[data-favorite]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        event => {

                            const id =
                                event
                                    .currentTarget
                                    .dataset
                                    .favorite;


                            toggleFavorite(id);

                        }
                    );

                }
            );

    }


    /* =====================================================
       FEATURED DUA HTML
       ===================================================== */

    function featuredHTML(dua) {

        if (!dua) {

            return "";

        }


        const colorClass =
            getColorClass(dua);


        return `

            <article
                class="featured-dua-card ${colorClass}"
            >

                <span class="featured-category">

                    ${escapeHTML(
                        dua.categoryName ||
                        dua.category ||
                        "General"
                    )}

                </span>


                <h3>

                    ${escapeHTML(
                        dua.title ||
                        "Dua of the Day"
                    )}

                </h3>


                <div
                    class="featured-arabic"
                    dir="rtl"
                    lang="ar"
                >

                    ${escapeHTML(
                        dua.arabic
                    )}

                </div>


                ${
                    dua.transliteration
                    ? `
                        <p
                            class="featured-transliteration"
                        >

                            ${escapeHTML(
                                dua.transliteration
                            )}

                        </p>
                    `
                    : ""
                }


                <p class="featured-translation">

                    ${escapeHTML(
                        dua.translation
                    )}

                </p>


                ${
                    dua.source
                    ? `
                        <small>

                            📖
                            ${escapeHTML(
                                dua.source
                            )}

                        </small>
                    `
                    : ""
                }

            </article>

        `;

    }


    /* =====================================================
       DUA OF THE DAY
       ===================================================== */

    function renderFeaturedDua() {

        if (
            !featuredDua ||
            !duas.length
        ) {

            return;

        }


        const today =
            new Date();


        const startOfDay =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );


        const dayNumber =
            Math.floor(
                startOfDay.getTime()
                /
                86400000
            );


        const index =
            Math.abs(dayNumber)
            % duas.length;


        featuredDua.innerHTML =
            featuredHTML(
                duas[index]
            );

    }


    /* =====================================================
       RANDOM DUA
       ===================================================== */

    function showRandomDua() {

        if (
            !duas.length ||
            !featuredDua
        ) {

            return;

        }


        const randomIndex =
            Math.floor(
                Math.random() *
                duas.length
            );


        const dua =
            duas[randomIndex];


        featuredDua.innerHTML =
            featuredHTML(dua);


        /*
         * Scroll featured card into view
         */

        featuredDua.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =====================================================
       SEARCH EVENT
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderDuas
        );

    }


    /* =====================================================
       CATEGORY EVENT
       ===================================================== */

    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            renderDuas
        );

    }


    /* =====================================================
       RANDOM BUTTON
       ===================================================== */

    if (randomButton) {

        randomButton.addEventListener(
            "click",
            showRandomDua
        );

    }


    /* =====================================================
       FAVORITES BUTTON
       ===================================================== */

    if (favoritesButton) {

        favoritesButton.addEventListener(
            "click",
            () => {

                showingFavorites =
                    !showingFavorites;


                favoritesButton.classList.toggle(
                    "active",
                    showingFavorites
                );


                favoritesButton.textContent =
                    showingFavorites
                        ? "⭐ All Duas"
                        : "⭐ Favorites";


                renderDuas();

            }
        );

    }


    /* =====================================================
       START
       ===================================================== */

    updateStats();

    renderFeaturedDua();

    renderDuas();


    console.log(
        "IQRANIX Daily Duas initialized successfully."
    );

});