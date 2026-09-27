//i hope the oneshot works
//i wasn't able to complete whole features but tried my best due to js
const buttons = document.querySelectorAll(".button-container");

const homePage = document.querySelector("#home-page");
const explorePage = document.querySelector(".explore-page");
const libraryPage = document.querySelector(".library-page");
const settingsPage = document.querySelector(".settings-page");
const secondaryPage = document.querySelector(".secondary-page");

const podcastPages = document.querySelectorAll(".podcast-detail-page");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        podcastPages.forEach(function(page) {
            page.classList.remove("is-open");
        });
        secondaryPage.classList.add("sidebar-view");
        history.replaceState(
            null,
            "",
            window.location.pathname
        );
        homePage.style.display = "none";
        explorePage.style.display = "none";
        libraryPage.style.display = "none";
        settingsPage.style.display = "none";
        if (button.innerText.includes("Home")) {
            homePage.style.display = "block";
        }
        if (button.innerText.includes("Explore")) {
            explorePage.style.display = "block";
        }
        if (button.innerText.includes("Library")) {
            libraryPage.style.display = "block";
        }
        if (button.innerText.includes("Settings")) {
            settingsPage.style.display = "block";
        }
        window.scrollTo(0, 0);
    });
});
document.addEventListener("click", function(event) {
    const link = event.target.closest("a[href^='#']");
    if (!link) {
        return;
    }
    const id = link.getAttribute("href").substring(1);
    const page = document.getElementById(id);
    if (
        page &&
        page.classList.contains("podcast-detail-page")
    ) {
        event.preventDefault();
        homePage.style.display = "none";
        explorePage.style.display = "none";
        libraryPage.style.display = "none";
        settingsPage.style.display = "none";
        podcastPages.forEach(function(podcastPage) {
            podcastPage.classList.remove("is-open");
        });
        page.classList.add("is-open");
        secondaryPage.classList.remove("sidebar-view");
        history.replaceState(
            null,
            "",
            window.location.pathname
        );
        window.scrollTo(0, 0);
    }
});
//Holy shit js is hard //
const cards = document.querySelectorAll(".continue-card");
cards.forEach(function(card) {
    card.addEventListener("click", function() {
        cards.forEach(function(card) {
            card.classList.remove("active-card");
        });
        card.classList.add("active-card");
    });
});
const libraryTabs = document.querySelectorAll(".library-tab");
const subscribedContent = document.querySelector(".subscribed-content");
const savedContent = document.querySelector(".saved-content");
const historyContent = document.querySelector(".history-content");
libraryTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        libraryTabs.forEach(function(tab) {
            tab.classList.remove("active-library-tab");
        });
        tab.classList.add("active-library-tab");
        if (tab.innerText.includes("Subscribed")) {
            subscribedContent.style.display = "block";
            savedContent.style.display = "none";
            historyContent.style.display = "none";
        }
        if (tab.innerText.includes("Saved")) {
            subscribedContent.style.display = "none";
            savedContent.style.display = "block";
            historyContent.style.display = "none";
        }
        if (tab.innerText.includes("History")) {
            subscribedContent.style.display = "none";
            savedContent.style.display = "none";
            historyContent.style.display = "block";
        }
    });
});
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
const resultCount = document.querySelector("#resultCount");
const searchResultContainer = document.querySelector("#searchResultContainer");
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
            const resultCard = card.cloneNode(true);
            searchResultContainer.appendChild(resultCard);
            count++;
        }
    });
    resultCount.innerText = count + ' results for "' + searchInput.value + '"';
    searchResults.style.display = "block";
});
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
const expandButton = document.querySelector(".expand-button");
const fullPlayer = document.querySelector("#fullPlayer");
const fullPlayerImage = document.querySelector("#fullPlayerImage");
const fullPlayerTitle = document.querySelector("#fullPlayerTitle");
const fullPlayerArtist = document.querySelector("#fullPlayerArtist");
const closeButton = document.querySelector(".close-player-button");
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
expandButton.addEventListener("click", function() {
    fullPlayer.style.display = "block";
    fullPlayerImage.src = playerImage.src;
    fullPlayerTitle.innerText = playerTitle.innerText;
    fullPlayerArtist.innerText = playerArtist.innerText;
});
closeButton.addEventListener("click", function () {
    fullPlayer.style.display = "none";
});
const mysteryTabs = document.querySelectorAll("[data-mystery-tab]");
const mysteryEpisodes = document.querySelector("#mystery-episodes");
const mysteryAbout = document.querySelector("#mystery-about");
mysteryTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        mysteryTabs.forEach(function(tab) {
            tab.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        if (tab.dataset.mysteryTab === "episodes") {
            mysteryEpisodes.style.display = "block";
            mysteryAbout.style.display = "none";
        }
        if (tab.dataset.mysteryTab === "about") {
            mysteryEpisodes.style.display = "none";
            mysteryAbout.style.display = "block";
        }
    });
});
const dailyTabs =
    document.querySelectorAll("[data-daily-tab]");
const dailyEpisodes =
    document.querySelector("#daily-episodes");
const dailyAbout =
    document.querySelector("#daily-about");
dailyTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        dailyTabs.forEach(function(tab) {
            tab.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        if (tab.dataset.dailyTab === "episodes") {
            dailyEpisodes.style.display = "flex";
            dailyAbout.style.display = "none";
        }
        if (tab.dataset.dailyTab === "about") {
            dailyEpisodes.style.display = "none";
            dailyAbout.style.display = "block";
        }
    });
});
const laughTabs =
    document.querySelectorAll("[data-laugh-tab]");
const laughEpisodes =
    document.querySelector("#laugh-episodes");
const laughAbout =
    document.querySelector("#laugh-about");
laughTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        laughTabs.forEach(function(tab) {
            tab.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        if (tab.dataset.laughTab === "episodes") {
            laughEpisodes.style.display = "block";
            laughAbout.style.display = "none";
        }
        if (tab.dataset.laughTab === "about") {
            laughEpisodes.style.display = "none";
            laughAbout.style.display = "block";
        }
    });
});
const scienceTabs =
    document.querySelectorAll("[data-science-tab]");
const scienceEpisodes =
    document.querySelector("#science-episodes");
const scienceAbout =
    document.querySelector("#science-about");
scienceTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        scienceTabs.forEach(function(tab) {
            tab.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        if (tab.dataset.scienceTab === "episodes") {
            scienceEpisodes.style.display = "block";
            scienceAbout.style.display = "none";
        }
        if (tab.dataset.scienceTab === "about") {
            scienceEpisodes.style.display = "none";
            scienceAbout.style.display = "block";
        }
    });
});
const morningTabs =
    document.querySelectorAll("[data-morning-tab]");
const morningEpisodes =
    document.querySelector("#morning-episodes");
const morningAbout =
    document.querySelector("#morning-about");
morningTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        morningTabs.forEach(function(tab) {
            tab.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        if (tab.dataset.morningTab === "episodes") {
            morningEpisodes.style.display = "block";
            morningAbout.style.display = "none";
        }
        if (tab.dataset.morningTab === "about") {
            morningEpisodes.style.display = "none";
            morningAbout.style.display = "block";
        }
    });
});
const startupTabs =
    document.querySelectorAll("[data-startup-tab]");
const startupEpisodes =
    document.querySelector("#startup-episodes");
const startupAbout =
    document.querySelector("#startup-about");
startupTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        startupTabs.forEach(function(tab) {
            tab.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        if (tab.dataset.startupTab === "episodes") {
            startupEpisodes.style.display = "block";
            startupAbout.style.display = "none";
        }
        if (tab.dataset.startupTab === "about") {
            startupEpisodes.style.display = "none";
            startupAbout.style.display = "block";
        }
    });
});
window.addEventListener("hashchange", function() {
    window.scrollTo(0, 0);
});
document.querySelectorAll(".detail-back").forEach(function(backButton) {

    backButton.addEventListener("click", function(event) {

        event.preventDefault();

        podcastPages.forEach(function(page) {
            page.classList.remove("is-open");
        });

        secondaryPage.classList.add("sidebar-view");

        homePage.style.display = "block";
        explorePage.style.display = "none";
        libraryPage.style.display = "none";
        settingsPage.style.display = "none";

        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        document.querySelector(".button-container:first-child")
            .classList.add("active");

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

        window.scrollTo(0, 0);
    });

});