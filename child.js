```javascript
/* =========================================================
   CHILDREN CREATIVE ART SHOWCASE
   Main JavaScript File
   ========================================================= */


/* =========================
   PAGE LOAD
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Little Artists website loaded successfully.");

    initializeNavigation();
    initializeAccountButtons();
    initializeAnimations();

});


/* =========================
   NAVIGATION
   ========================= */

function initializeNavigation() {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const pageName = this.getAttribute("href");

            console.log("Opening page:", pageName);

        });

    });

}


/* =========================
   ACCOUNT SELECTION
   ========================= */

function initializeAccountButtons() {

    const accountLinks = document.querySelectorAll(".account-card a");

    accountLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const url = new URL(this.href);

            const accountType = url.searchParams.get("type");

            if (accountType) {

                localStorage.setItem(
                    "selectedAccountType",
                    accountType
                );

                console.log(
                    "Selected account type:",
                    accountType
                );
            }

        });

    });

}


/* =========================
   ANIMATIONS
   ========================= */

function initializeAnimations() {

    const cards = document.querySelectorAll(
        ".account-card, .feature-card, .step"
    );

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    cards.forEach(function (card) {

        observer.observe(card);

    });

}


/* =========================
   ACCOUNT TYPE
   ========================= */

function getAccountType() {

    return localStorage.getItem(
        "selectedAccountType"
    );

}


/* =========================
   USER LOGIN STATUS
   ========================= */

function isUserLoggedIn() {

    const user = localStorage.getItem("currentUser");

    return user !== null;

}


/* =========================
   SAVE USER
   ========================= */

function saveUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}


/* =========================
   GET CURRENT USER
   ========================= */

function getCurrentUser() {

    const user = localStorage.getItem("currentUser");

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "Unable to read user information."
        );

        return null;

    }

}


/* =========================
   LOGOUT
   ========================= */

function logoutUser() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem(
        "selectedAccountType"
    );

    window.location.href = "index.html";

}


/* =========================
   ARTWORK STORAGE
   ========================= */

function getArtworks() {

    const artworks =
        localStorage.getItem("artworks");

    if (!artworks) {

        return [];

    }

    try {

        return JSON.parse(artworks);

    } catch (error) {

        return [];

    }

}


/* =========================
   SAVE ARTWORK
   ========================= */

function saveArtwork(artwork) {

    const artworks = getArtworks();

    artwork.id =
        Date.now();

    artwork.likes = 0;

    artwork.comments = [];

    artwork.createdAt =
        new Date().toISOString();

    artworks.push(artwork);

    localStorage.setItem(
        "artworks",
        JSON.stringify(artworks)
    );

}


/* =========================
   LIKE ARTWORK
   ========================= */

function likeArtwork(artworkId) {

    const artworks = getArtworks();

    const artwork =
        artworks.find(
            item => item.id === artworkId
        );

    if (!artwork) {

        return;

    }

    artwork.likes++;

    localStorage.setItem(
        "artworks",
        JSON.stringify(artworks)
    );

}


/* =========================
   ADD COMMENT
   ========================= */

function addComment(
    artworkId,
    commentText,
    userName
) {

    if (!commentText.trim()) {

        return;

    }

    const artworks = getArtworks();

    const artwork =
        artworks.find(
            item => item.id === artworkId
        );

    if (!artwork) {

        return;

    }

    artwork.comments.push({

        id: Date.now(),

        user: userName,

        text: commentText,

        date:
            new Date().toISOString()

    });

    localStorage.setItem(
        "artworks",
        JSON.stringify(artworks)
    );

}


/* =========================
   CREATIVITY SCORE
   ========================= */

function calculateCreativityScore(artwork) {

    if (!artwork) {

        return 0;

    }

    const likes =
        artwork.likes || 0;

    const comments =
        artwork.comments
            ? artwork.comments.length
            : 0;

    const challengePoints =
        artwork.challengePoints || 0;

    const originality =
        artwork.originality || 0;


    /*
       Example scoring system:

       Likes       = maximum 30 points
       Comments    = maximum 20 points
       Challenge   = maximum 20 points
       Originality = maximum 30 points
    */

    const likeScore =
        Math.min(likes * 2, 30);

    const commentScore =
        Math.min(comments * 2, 20);

    const challengeScore =
        Math.min(challengePoints, 20);

    const originalityScore =
        Math.min(originality, 30);


    return (
        likeScore +
        commentScore +
        challengeScore +
        originalityScore
    );

}


/* =========================
   BADGE SYSTEM
   ========================= */

function getBadge(score) {

    if (score >= 90) {

        return "🏆 Master Creator";

    }

    if (score >= 75) {

        return "🌟 Creative Star";

    }

    if (score >= 50) {

        return "🎨 Rising Artist";

    }

    if (score >= 25) {

        return "🖌️ Young Creator";

    }

    return "🌱 New Artist";

}


/* =========================
   NOTIFICATION SYSTEM
   ========================= */

function createNotification(
    message,
    type = "general"
) {

    const notifications =
        JSON.parse(
            localStorage.getItem(
                "notifications"
            )
        ) || [];

    notifications.push({

        id: Date.now(),

        message: message,

        type: type,

        read: false,

        date:
            new Date().toISOString()

    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(
            notifications
        )
    );

}


/* =========================
   GET NOTIFICATIONS
   ========================= */

function getNotifications() {

    return JSON.parse(
        localStorage.getItem(
            "notifications"
        )
    ) || [];

}


/* =========================
   MARK NOTIFICATION AS READ
   ========================= */

function markNotificationRead(
    notificationId
) {

    const notifications =
        getNotifications();

    const notification =
        notifications.find(
            item =>
                item.id === notificationId
        );

    if (!notification) {

        return;

    }

    notification.read = true;

    localStorage.setItem(
        "notifications",
        JSON.stringify(
            notifications
        )
    );

}


/* =========================
   SEARCH ARTWORK
   ========================= */

function searchArtwork(
    artworks,
    searchText
) {

    const search =
        searchText
            .toLowerCase()
            .trim();

    if (!search) {

        return artworks;

    }

    return artworks.filter(
        artwork => {

            const title =
                artwork.title
                    ? artwork.title.toLowerCase()
                    : "";

            const category =
                artwork.category
                    ? artwork.category.toLowerCase()
                    : "";

            const artist =
                artwork.artist
                    ? artwork.artist.toLowerCase()
                    : "";

            return (
                title.includes(search) ||
                category.includes(search) ||
                artist.includes(search)
            );

        }
    );

}


/* =========================
   FILTER ARTWORK
   ========================= */

function filterArtwork(
    artworks,
    category
) {

    if (
        !category ||
        category === "all"
    ) {

        return artworks;

    }

    return artworks.filter(
        artwork =>
            artwork.category === category
    );

}


/* =========================
   SORT BY LIKES
   ========================= */

function sortByLikes(artworks) {

    return [...artworks].sort(
        (a, b) =>
            (b.likes || 0) -
            (a.likes || 0)
    );

}


/* =========================
   SORT BY CREATIVITY
   ========================= */

function sortByCreativity(artworks) {

    return [...artworks].sort(
        (a, b) =>
            calculateCreativityScore(b) -
            calculateCreativityScore(a)
    );

}


/* =========================
   CHALLENGE STORAGE
   ========================= */

function getChallenges() {

    return JSON.parse(
        localStorage.getItem(
            "challenges"
        )
    ) || [];

}


/* =========================
   CREATE CHALLENGE
   ========================= */

function createChallenge(challenge) {

    const challenges =
        getChalleng
```
