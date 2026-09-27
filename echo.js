/*i am not that perfect in js but youtube oneshot might work*/
const buttons = document.querySelectorAll(".button-container");

const homePage = document.querySelector("#home-page");
const explorePage = document.querySelector(".explore-page");
const libraryPage = document.querySelector(".library-page");
const settingsPage = document.querySelector(".settings-page");
const secondaryPage = document.querySelector(".secondary-page");
const podcastPages = document.querySelectorAll(".podcast-detail-page");
const pages = {
    home: homePage,
    explore: explorePage,
    library: libraryPage,
    settings: settingsPage
};
function showPage(pageName) {
    Object.values(pages).forEach(function(page) {
        page.style.display = "none";
    });
    podcastPages.forEach(function(page) {
        page.classList.remove("is-open");
    });
    secondaryPage.classList.add("sidebar-view");
    history.replaceState(null, "", window.location.pathname);
    const page = pages[pageName];
    if (page) {
        page.style.display = "block";
    }

    window.scrollTo(0, 0);
}
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        showPage(button.dataset.page);
    });
});
/*goddamn js is hard*/
function openPodcastPage(page) {
    Object.values(pages).forEach(function(p) {
        p.style.display = "none";
    });
    podcastPages.forEach(function(p) {
        p.classList.remove("is-open");
    });
    page.classList.add("is-open");
    secondaryPage.classList.remove("sidebar-view");
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
}
document.addEventListener("click", function(event) {
    const link = event.target.closest("a[href^='#']");
    if (!link) {
        return;
    }
    const id = link.getAttribute("href").substring(1);
    const page = document.getElementById(id);
    if (page && page.classList.contains("podcast-detail-page")) {
        event.preventDefault();
        openPodcastPage(page);
    }
});
document.querySelectorAll(".detail-back").forEach(function(backButton) {
    backButton.addEventListener("click", function(event) {
        event.preventDefault();

        showPage("home");

        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        document.querySelector('[data-page="home"]').classList.add("active");
    });
});
const cards = document.querySelectorAll(".continue-card");
cards.forEach(function(card) {
    card.addEventListener("click", function() {
        cards.forEach(function(c) {
            c.classList.remove("active-card");
        });
        card.classList.add("active-card");
    });
});
const libraryTabs = document.querySelectorAll(".library-tab");
const libraryContent = {
    subscribed: document.querySelector(".subscribed-content"),
    saved: document.querySelector(".saved-content"),
    history: document.querySelector(".history-content")
};

libraryTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        libraryTabs.forEach(function(t) {
            t.classList.remove("active-library-tab");
        });
        tab.classList.add("active-library-tab");

        Object.keys(libraryContent).forEach(function(key) {
            libraryContent[key].style.display = key === tab.dataset.libraryTab ? "block" : "none";
        });
    });
});
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const resultCount = document.querySelector("#resultCount");
const searchResultContainer = document.querySelector("#searchResultContainer");
const allPodcasts = document.querySelectorAll(".trending-card");

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();
    searchResultContainer.innerHTML = "";

    if (searchText === "") {
        searchResults.style.display = "none";
        return;
    }

    let count = 0;
    allPodcasts.forEach(function(card) {
        const text = card.innerText.toLowerCase();
        if (text.includes(searchText)) {
            searchResultContainer.appendChild(card.cloneNode(true));
            count++;
        }
    });

    resultCount.innerText = count + ' results for "' + searchInput.value + '"';
    searchResults.style.display = "block";
});
/* holy god after i start js i should focus more on this shit*/
const playerImage = document.querySelector("#playerImage");
const playerTitle = document.querySelector("#playerTitle");
const playerArtist = document.querySelector("#playerArtist");
const homeCards = document.querySelectorAll(".trending-card, .continue-card");

homeCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const image = card.querySelector("img");
        let title = card.querySelector(".trending-title");
        if (!title) {
            title = card.querySelector(".continue-name");
        }
        const artist = card.querySelector("p");
        playerImage.src = image.src;
        playerTitle.innerText = title.innerText;
        playerArtist.innerText = artist.innerText;
    });
});
const playPauseButton = document.querySelector(".play-pause-button");
const fullPlayPauseButton = document.querySelector(".full-play-pause-button");

function setPlaybackState(isPlaying) {
    [playPauseButton, fullPlayPauseButton].forEach(function(button) {
        button.classList.toggle("is-playing", isPlaying);
        button.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
        button.setAttribute("aria-pressed", String(isPlaying));
    });
}

playPauseButton.addEventListener("click", function() {
    setPlaybackState(!playPauseButton.classList.contains("is-playing"));
});
fullPlayPauseButton.addEventListener("click", function() {
    setPlaybackState(!fullPlayPauseButton.classList.contains("is-playing"));
});

const expandButton = document.querySelector(".expand-button");
const fullPlayer = document.querySelector("#fullPlayer");
const fullPlayerImage = document.querySelector("#fullPlayerImage");
const fullPlayerTitle = document.querySelector("#fullPlayerTitle");
const fullPlayerArtist = document.querySelector("#fullPlayerArtist");
const closeButton = document.querySelector(".close-player-button");

expandButton.addEventListener("click", function() {
    fullPlayer.style.display = "block";
    fullPlayerImage.src = playerImage.src;
    fullPlayerTitle.innerText = playerTitle.innerText;
    fullPlayerArtist.innerText = playerArtist.innerText;
});
closeButton.addEventListener("click", function() {
    fullPlayer.style.display = "none";
});
const EPISODES_DISPLAY = {
    daily: "flex"
};

function setupPodcastTabs(slug) {
    const tabs = document.querySelectorAll("[data-" + slug + "-tab]");
    const episodes = document.querySelector("#" + slug + "-episodes");
    const about = document.querySelector("#" + slug + "-about");
    const episodesDisplay = EPISODES_DISPLAY[slug] || "block";

    tabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
            tabs.forEach(function(t) {
                t.classList.remove("is-active");
            });
            tab.classList.add("is-active");

            const isEpisodesTab = tab.getAttribute("data-" + slug + "-tab") === "episodes";
            episodes.style.display = isEpisodesTab ? episodesDisplay : "none";
            about.style.display = isEpisodesTab ? "none" : "block";
        });
    });
}

["mystery", "daily", "laugh", "science", "morning", "startup"].forEach(setupPodcastTabs);    
const notificationToggle = document.querySelector("#notificationToggle");

if (notificationToggle) {
    notificationToggle.addEventListener("click", function() {
        notificationToggle.classList.toggle("active-toggle");
    });
}

window.addEventListener("hashchange", function() {
    window.scrollTo(0, 0);
});
/*successsful completion of internship 1 gonna go and eat a cake*/