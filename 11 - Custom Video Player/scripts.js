const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".full-screen");

let updatingProgress = false;
let updatingRange = false;

function togglePlay(e) {
	video[video.paused ? "play" : "pause"]();
}

function toggleIcon() {
	toggle.innerText = this.paused ? "►" : "❚ ❚";
}

function updateProgress() {
	progressBar.style.flexBasis =
		(100 * video.currentTime) / video.duration + "%";
}

function skip() {
	video.currentTime += parseInt(this.dataset.skip);
}

function requestFullScreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		/* Firefox */
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		/* Chrome, Safari and Opera */
		video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) {
		/* IE/Edge */
		video.msRequestFullscreen();
	}
	console.log(video);
}

function handleRangeUpdate(e) {
	video[e.target.name] = e.target.value;
}

function scrub(e) {
	video.currentTime = (video.duration * e.offsetX) / progress.offsetWidth;
}

function handleMousedown(e) {
	e.preventDefault();
	if (e.target.classList.value.includes("progress")) updatingProgress = true;
	if (e.target.matches(".player__slider")) updatingRange = true;
}

function handleMouseup() {
	updatingProgress = false;
	updatingRange = false;
}

function handleMousemove(e) {
	if (updatingRange) handleRangeUpdate(e);
	if (updatingProgress) scrub(e);
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", toggleIcon);
video.addEventListener("pause", toggleIcon);
video.addEventListener("timeupdate", updateProgress);

skipButtons.forEach(btn => btn.addEventListener("click", skip));
fullScreen.addEventListener("click", requestFullScreen);

progress.addEventListener("click", scrub);
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
player.addEventListener("mousedown", handleMousedown);
player.addEventListener("mouseup", handleMouseup);
player.addEventListener("mousemove", handleMousemove);
