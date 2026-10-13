// ========================================
// WEDDING INVITATION SETTINGS
// ========================================

// Reception date and time
const receptionDate = new Date("2026-11-13T18:00:00");


// ========================================
// DOM ELEMENTS
// ========================================

const openButton = document.getElementById("openInvitation");
const openingScreen = document.getElementById("openingScreen");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const envelopeScene = document.getElementById("envelopeScene");
const backgroundMusic = document.getElementById("backgroundMusic");
const nameReveal = document.getElementById("nameReveal");


// ========================================
// ANIMATED ENVELOPE OPENING
// ========================================

if (openButton) {
  openButton.addEventListener("click", () => {
    // Prevent multiple clicks
    if (envelope.classList.contains("opened")) return;

    // Open envelope
    envelope.classList.add("opened");
    envelopeScene.classList.add("opened");

   // Start background music after user interaction
    if (backgroundMusic) {
    backgroundMusic.volume = 0.45;

    backgroundMusic
        .play()
        .then(() => {
        console.log("Music started successfully.");
        })
        .catch((error) => {
        console.error("Music playback failed:", error);
        });
    }

    // Show invitation after envelope animation
    setTimeout(() => {
      openingScreen.classList.add("hidden");
      invitation.classList.add("visible");

      // Trigger name animation
      setTimeout(() => {
        if (nameReveal) {
          nameReveal.classList.add("animate");
        }
      }, 250);

      // Activate visible sections
      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.9) {
          element.classList.add("active");
        }
      });
    }, 1700);
  });
}


// ========================================
// COUNTDOWN TIMER
// ========================================

function updateCountdown() {
  const now = new Date().getTime();
  const target = receptionDate.getTime();
  const difference = target - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  if (difference <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});


// ========================================
// FALLING FLOWER ANIMATION
// ========================================

const flowersContainer = document.getElementById("flowersContainer");

const flowerSymbols = [
  "✿",
  "❀",
  "✽",
  "✾",
  "❋",
  "❁",
  "•"
];

function createFallingFlower() {
  if (!flowersContainer) return;

  const flower = document.createElement("span");

  flower.className = "falling-flower";

  flower.textContent =
    flowerSymbols[
      Math.floor(Math.random() * flowerSymbols.length)
    ];

  flower.style.left = `${Math.random() * 100}vw`;

  const size = Math.random() * 14 + 10;
  flower.style.fontSize = `${size}px`;

  const duration = Math.random() * 8 + 8;
  flower.style.animationDuration = `${duration}s`;

  flower.style.animationDelay = `${Math.random() * 2}s`;

  flower.style.setProperty(
    "--drift",
    `${Math.random() * 160 - 80}px`
  );

  flowersContainer.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, (duration + 3) * 1000);
}

// Initial flowers
for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    createFallingFlower();
  }, i * 300);
}

// Continuous flowers
setInterval(createFallingFlower, 900);