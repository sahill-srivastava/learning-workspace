// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

video.addEventListener("loadedmetadata", () => {
  vidTime.textContent = `${formatTime(video.currentTime)}/${formatTime(
    video.duration
  )}`;
});

const playerControls = document.querySelector(".player__controls");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const vidTime = player.querySelector(".video__timing");
const skipButtons = player.querySelectorAll("[data-skip]");

const ranges = player.querySelectorAll(".player_slider");
const fullScreenBtn = document.querySelector(".full_btn");

// build our functions
let hideTimer;

function showPlayerControls() {
  playerControls.classList.add("hovered");

  clearTimeout(hideTimer);
  hideTimer = setTimeout(hidePlayerControls, 3000);
}

function hidePlayerControls() {
  playerControls.classList.remove("hovered");
}

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  showPlayerControls();
}

function updateButton() {
  const icon = this.paused ? "▶︎" : "❚❚";
  toggle.textContent = icon;
}

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgressBar() {
  const x = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${x}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    fullScreenBtn.textContent = "✕";
  } else {
    document.exitFullscreen();
    fullScreenBtn.textContent = "⛶";
  }
}

// hook up the event listeners
player.addEventListener("mousemove", showPlayerControls);
player.addEventListener("mouseleave", hidePlayerControls);

video.addEventListener("timeupdate", () => {
  vidTime.textContent = `${formatTime(video.currentTime)}/${formatTime(
    video.duration
  )}`;
});

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgressBar);
toggle.addEventListener("click", updateButton);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));

// scrub
let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("click", scrub);

// fulscreen
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("dblclick", () => document.exitFullscreen());
