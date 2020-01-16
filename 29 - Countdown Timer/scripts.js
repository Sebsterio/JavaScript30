const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

const format12h = true;

let countdown;

function displayTimeLeft(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const minsString = (mins < 10 ? "0" : "") + mins;
	const secsString = (secs < 10 ? "0" : "") + secs;
	const timeString = minsString + ":" + secsString;
	document.title = timeString;
	timerDisplay.textContent = timeString;
}

function displayEndTime(timestamp) {
	const date = new Date(timestamp);
	let hour = date.getHours();
	const min = date.getMinutes();
	const sec = date.getSeconds();
	let suffix = "";

	if (format12h) {
		if (hour > 12) {
			hour = hour - 12;
			suffix = " PM";
		} else suffix = " AM";
	}
	const minsString = (min < 10 ? "0" : "") + min;

	endTime.textContent = hour + ":" + minsString + suffix;
}

function timer(seconds) {
	const now = Date.now();
	const then = now + seconds * 1000;

	displayTimeLeft(seconds);
	displayEndTime(then);

	clearInterval(countdown);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		displayTimeLeft(secondsLeft);
		if (secondsLeft <= 0) clearInterval(countdown);
	}, 1000);
}

buttons.forEach(button =>
	button.addEventListener("click", e => timer(parseInt(e.target.dataset.time)))
);
document.customForm.addEventListener("submit", function(e) {
	e.preventDefault();
	timer(parseInt(this.minutes.value) * 60);
	this.reset();
});
