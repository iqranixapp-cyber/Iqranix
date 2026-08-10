/* =========================================================
   MUSLIM BRO - QURAN AUDIO
   MP3Quran API
   ========================================================= */

(() => {
  "use strict";

  const API = "https://mp3quran.net/api/v3";

  let surahs = [];
  let reciters = [];
  let selectedSurah = null;
  let selectedReciter = null;

  // ---------------------------------------------------------
  // ELEMENTS
  // ---------------------------------------------------------

  const surahSelect = document.getElementById("surahSelect");
  const reciterSelect = document.getElementById("reciterSelect");
  const searchInput = document.getElementById("surahSearch");
  const audio = document.getElementById("audioPlayer");

  const playBtn = document.getElementById("playBtn");
  const stopBtn = document.getElementById("stopBtn");
  const restartBtn = document.getElementById("restartBtn");

  // ---------------------------------------------------------
  // SAFE FETCH
  // ---------------------------------------------------------

  async function getJSON(url) {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error("Server returned " + response.status);
    }

    return await response.json();
  }

  // ---------------------------------------------------------
  // LOAD SURAHS
  // ---------------------------------------------------------

  async function loadSurahs() {
    try {
      if (surahSelect) {
        surahSelect.innerHTML =
          '<option value="">Loading Surahs...</option>';
      }

      const data = await getJSON(
        API + "/suwar?language=eng"
      );

      surahs = Array.isArray(data.suwar)
        ? data.suwar
        : [];

      if (!surahs.length) {
        throw new Error("No Surahs returned");
      }

      populateSurahs(surahs);

      console.log("Loaded Surahs:", surahs.length);

    } catch (error) {
      console.error("Surah loading error:", error);

      if (surahSelect) {
        surahSelect.innerHTML =
          '<option value="">Could not load Surahs</option>';
      }

      showError(
        "Could not load Surahs. Please refresh the page."
      );
    }
  }

  // ---------------------------------------------------------
  // DISPLAY SURAHS
  // ---------------------------------------------------------

  function populateSurahs(list) {
    if (!surahSelect) return;

    surahSelect.innerHTML =
      '<option value="">Select a Surah</option>';

    list.forEach((surah) => {
      const option = document.createElement("option");

      option.value = String(surah.id);

      option.textContent =
        String(surah.id).padStart(3, "0") +
        ". " +
        String(surah.name || "").trim();

      surahSelect.appendChild(option);
    });
  }

  // ---------------------------------------------------------
  // SEARCH SURAHS
  // ---------------------------------------------------------

  function searchSurahs() {
    if (!searchInput) return;

    const query =
      searchInput.value.trim().toLowerCase();

    if (!query) {
      populateSurahs(surahs);
      return;
    }

    const results = surahs.filter((surah) => {
      const id = String(surah.id);

      const name =
        String(surah.name || "").toLowerCase();

      return (
        id === query ||
        id.includes(query) ||
        name.includes(query)
      );
    });

    populateSurahs(results);
  }

  // ---------------------------------------------------------
  // LOAD RECITERS
  // ---------------------------------------------------------

  async function loadReciters() {
    try {
      if (reciterSelect) {
        reciterSelect.innerHTML =
          '<option value="">Loading reciters...</option>';
      }

      const data = await getJSON(
        API + "/reciters?language=eng"
      );

      reciters = Array.isArray(data.reciters)
        ? data.reciters
        : [];

      if (!reciters.length) {
        throw new Error("No reciters returned");
      }

      populateReciters();

      console.log(
        "Loaded reciters:",
        reciters.length
      );

    } catch (error) {
      console.error("Reciter loading error:", error);

      if (reciterSelect) {
        reciterSelect.innerHTML =
          '<option value="">Could not load reciters</option>';
      }

      showError(
        "Could not load reciters. Please refresh the page."
      );
    }
  }

  // ---------------------------------------------------------
  // DISPLAY RECITERS
  // ---------------------------------------------------------

  function populateReciters() {
    if (!reciterSelect) return;

    reciterSelect.innerHTML =
      '<option value="">Select a Reciter</option>';

    reciters.forEach((reciter) => {
      if (!reciter.moshaf || !reciter.moshaf.length) {
        return;
      }

      const option = document.createElement("option");

      option.value = String(reciter.id);

      option.textContent =
        reciter.name || "Unknown Reciter";

      reciterSelect.appendChild(option);
    });
  }

  // ---------------------------------------------------------
  // FIND RECITER
  // ---------------------------------------------------------

  function findReciter(id) {
    return reciters.find(
      (reciter) =>
        String(reciter.id) === String(id)
    );
  }

  // ---------------------------------------------------------
  // FIND SUITABLE MOSHAF
  // ---------------------------------------------------------

  function findMoshaf(reciter, surahNumber) {
    if (!reciter || !Array.isArray(reciter.moshaf)) {
      return null;
    }

    const number = String(surahNumber);

    // Prefer a moshaf containing this Surah
    for (const moshaf of reciter.moshaf) {
      if (!moshaf.server) continue;

      const list = String(
        moshaf.surah_list || ""
      )
        .split(",")
        .map((x) => x.trim());

      if (list.includes(number)) {
        return moshaf;
      }
    }

    // Fallback to first usable moshaf
    return (
      reciter.moshaf.find(
        (m) => m && m.server
      ) || null
    );
  }

  // ---------------------------------------------------------
  // AUDIO URL
  // ---------------------------------------------------------

  function buildAudioURL(moshaf, surahNumber) {
    if (!moshaf || !moshaf.server) {
      return null;
    }

    const number =
      String(surahNumber).padStart(3, "0");

    let server = String(moshaf.server);

    if (!server.endsWith("/")) {
      server += "/";
    }

    return server + number + ".mp3";
  }

  // ---------------------------------------------------------
  // SELECT SURAH
  // ---------------------------------------------------------

  function selectSurah() {
    if (!surahSelect) return;

    const id = surahSelect.value;

    if (!id) {
      selectedSurah = null;
      return;
    }

    selectedSurah =
      surahs.find(
        (surah) =>
          String(surah.id) === String(id)
      ) || null;

    console.log(
      "Selected Surah:",
      selectedSurah
    );

    prepareAudio();
  }

  // ---------------------------------------------------------
  // SELECT RECITER
  // ---------------------------------------------------------

  function selectReciter() {
    if (!reciterSelect) return;

    const id = reciterSelect.value;

    if (!id) {
      selectedReciter = null;
      return;
    }

    selectedReciter = findReciter(id);

    console.log(
      "Selected Reciter:",
      selectedReciter
    );

    if (selectedSurah) {
      prepareAudio();
    }
  }

  // ---------------------------------------------------------
  // PREPARE AUDIO
  // ---------------------------------------------------------

  function prepareAudio() {
    if (!audio) return;

    if (!selectedSurah) {
      return;
    }

    if (!selectedReciter) {
      return;
    }

    const moshaf = findMoshaf(
      selectedReciter,
      selectedSurah.id
    );

    if (!moshaf) {
      showError(
        "This reciter does not have this Surah."
      );
      return;
    }

    const url = buildAudioURL(
      moshaf,
      selectedSurah.id
    );

    if (!url) {
      showError(
        "Audio is unavailable for this reciter."
      );
      return;
    }

    console.log("Audio URL:", url);

    audio.pause();

    audio.src = url;

    audio.load();

    audio.onloadedmetadata = () => {
      console.log(
        "Audio loaded successfully."
      );
    };

    audio.onerror = () => {
      console.error(
        "Audio failed:",
        audio.error
      );

      showError(
        "Audio could not be loaded. Try another reciter."
      );
    };

    updateTitle();
  }

  // ---------------------------------------------------------
  // UPDATE TITLE
  // ---------------------------------------------------------

  function updateTitle() {
    const title =
      document.getElementById("selectedSurahTitle");

    if (!title || !selectedSurah) return;

    title.textContent =
      selectedSurah.name || "Quran Recitation";
  }

  // ---------------------------------------------------------
  // PLAY
  // ---------------------------------------------------------

  function playAudio() {
    if (!audio) return;

    if (!audio.src) {
      if (!selectedSurah) {
        showError(
          "Please select a Surah first."
        );
        return;
      }

      if (!selectedReciter) {
        showError(
          "Please select a reciter first."
        );
        return;
      }

      prepareAudio();
    }

    audio.play().catch((error) => {
      console.error(
        "Playback error:",
        error
      );

      showError(
        "Tap Play again to start the recitation."
      );
    });
  }

  // ---------------------------------------------------------
  // STOP
  // ---------------------------------------------------------

  function stopAudio() {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }

  // ---------------------------------------------------------
  // RESTART
  // ---------------------------------------------------------

  function restartAudio() {
    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {});
  }

  // ---------------------------------------------------------
  // ERROR MESSAGE
  // ---------------------------------------------------------

  function showError(message) {
    console.warn(message);

    const errorBox =
      document.getElementById("audioMessage");

    if (errorBox) {
      errorBox.textContent = message;
      errorBox.style.display = "block";

      setTimeout(() => {
        errorBox.style.display = "none";
      }, 5000);
    }
  }

  // ---------------------------------------------------------
  // EVENT LISTENERS
  // ---------------------------------------------------------

  if (surahSelect) {
    surahSelect.addEventListener(
      "change",
      selectSurah
    );
  }

  if (reciterSelect) {
    reciterSelect.addEventListener(
      "change",
      selectReciter
    );
  }

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      searchSurahs
    );
  }

  if (playBtn) {
    playBtn.addEventListener(
      "click",
      playAudio
    );
  }

  if (stopBtn) {
    stopBtn.addEventListener(
      "click",
      stopAudio
    );
  }

  if (restartBtn) {
    restartBtn.addEventListener(
      "click",
      restartAudio
    );
  }

  // ---------------------------------------------------------
  // INITIALIZE
  // ---------------------------------------------------------

  async function init() {
    console.log(
      "Muslim Bro Quran Audio starting..."
    );

    await Promise.all([
      loadSurahs(),
      loadReciters()
    ]);

    console.log(
      "Muslim Bro Quran Audio ready."
    );
  }

  // Start
  init();

})();