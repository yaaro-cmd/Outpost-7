const GAME_URL = "https://khoichon.dev/mindustry-web/offlinemode/build/";

const launchButton = document.querySelector("#launchButton");
const launchStatus = document.querySelector("#launchStatus");
const gameFrame = document.querySelector("#gameFrame");
const gamePlaceholder = document.querySelector("#gamePlaceholder");
const gameFrameWrap = document.querySelector("#gameFrameWrap");
const fullscreenButton = document.querySelector("#fullscreenButton");

launchButton.addEventListener("click", () => {
  launchButton.disabled = true;
  launchButton.innerHTML = '<span class="loading-ring" aria-hidden="true"></span> CONNECTING TO SERPULO';
  launchStatus.textContent = "LOADING GAME CODE AND ASSETS…";
  gameFrame.src = GAME_URL;
  gameFrame.classList.add("is-active");
  gameFrameWrap.classList.add("has-game");
  gamePlaceholder.classList.add("is-hidden");
});

gameFrame.addEventListener("load", () => {
  if (gameFrame.src) launchStatus.textContent = "GAME PORT LOADED · FOLLOW THE IN-GAME TUTORIAL";
});

fullscreenButton.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await gameFrameWrap.requestFullscreen();
    }
  } catch {
    launchStatus.textContent = "FULLSCREEN IS NOT AVAILABLE IN THIS BROWSER";
  }
});

document.addEventListener("fullscreenchange", () => {
  fullscreenButton.setAttribute("aria-label", document.fullscreenElement ? "Exit fullscreen" : "Fullscreen game");
  fullscreenButton.title = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
});
