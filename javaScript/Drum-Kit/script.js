// keydown event
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.drum-pad[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".drum-pad");

keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);


// click event
function soundOn(e) {
  const audio = document.querySelector(`audio[data-key="${e.currentTarget.dataset.key}"]`);
  const key = document.querySelector(`.drum-pad[data-key="${e.currentTarget.dataset.key}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

keys.forEach((key) => key.addEventListener("click", soundOn));
