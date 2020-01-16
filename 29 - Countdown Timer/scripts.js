const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

const format12h = true;

let countdown;

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

function displayTimeLeft(seconds) {
	const mins = Math.floor(seconds / 60);
	const secsLeft = seconds % 60;
	const minsString = (mins < 10 ? "0" : "") + mins;
	const secsString = (secsLeft < 10 ? "0" : "") + secsLeft;
	const timeString = minsString + ":" + secsString;
	timerDisplay.textContent = timeString;
	document.title = timeString;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	let hour = end.getHours();
	const mins = end.getMinutes();
	const minsString = (mins < 10 ? "0" : "") + mins;

	let suffix = "";
	if (format12h) {
		if (hour > 12) {
			hour = hour - 12;
			suffix = " PM";
		} else {
			suffix = " AM";
		}
	}
	endTime.textContent = hour + ":" + minsString + suffix;
}

buttons.forEach(button =>
	button.addEventListener("click", () => timer(parseInt(button.dataset.time)))
);
document.customForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});
