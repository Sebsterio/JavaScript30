const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const pathnames = [
	"/01%20-%20JavaScript%20Drum%20Kit/index.html",
	"/02%20-%20JS%20and%20CSS%20Clock/index.html",
	"/03%20-%20CSS%20Variables/index.html",
	"/04%20-%20Array%20Cardio%20Day%201/index.html",
	"/05%20-%20Flex%20Panel%20Gallery/index.html",
	"/06%20-%20Type%20Ahead/index.html",
	"/07%20-%20Array%20Cardio%20Day%202/index.html",
	"/08%20-%20Fun%20with%20HTML5%20Canvas/index.html",
	"/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index.html",
	"/11%20-%20Custom%20Video%20Player/index.html",
	"/12%20-%20Key%20Sequence%20Detection/index.html",
	"/13%20-%20Slide%20in%20on%20Scroll/index.html",
	"/15%20-%20LocalStorage/index.html",
	"/16%20-%20Mouse%20Move%20Shadow/index.html",
	"/17%20-%20Sort%20Without%20Articles/index.html",
	"/18%20-%20Adding%20Up%20Times%20with%20Reduce/index.html",
	"/19%20-%20Webcam%20Fun/index.html",
	"/20%20-%20Speech%20Detection/index.html",
	"/21%20-%20Geolocation/index.html",
	"/22%20-%20Follow%20Along%20Link%20Highlighter/index.html",
	"/23%20-%20Speech%20Synthesis/index.html",
	"/24%20-%20Sticky%20Nav/index.html",
	"/26%20-%20Stripe%20Follow%20Along%20Nav/index.html",
	"/27%20-%20Click%20and%20Drag/index.html",
	"/28%20-%20Video%20Speed%20Controller/index.html",
	"/29%20-%20Countdown%20Timer/index.html",
	"/30%20-%20Whack%20A%20Mole/index.html"
];
