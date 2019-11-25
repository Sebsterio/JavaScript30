function playSound(keyCode) {
  const sound = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function togglePad(pad, on) {
  on ? pad.classList.add("playing") : pad.classList.remove("playing");
}

function handleKeyDown(e) {
  const pad = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (pad) {
    playSound(e.keyCode);
    togglePad(pad, true);
  }
}

function handleClick() {
  const keyCode = this.getAttribute("data-key");
  if (keyCode) {
    playSound(keyCode);
    togglePad(this, true);
  }
}
function handleTransitionEnd(e) {
  togglePad(this, false);
}

document.addEventListener("keydown", handleKeyDown);

const keys = document.querySelectorAll(".key");
keys.forEach(key => {
  key.addEventListener("mousedown", handleClick);
  key.addEventListener("transitionend", handleTransitionEnd);
});
