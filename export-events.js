const doc = document.documentElement;

function callback(e) {
	console.log("IF. e:" + e);
	if (window.parent) {
		console.log("IF. window parent =");
		console.dir(window.parent);
		window.parent.scrollTest();
	}
}

document.addEventListener("touchstart", callback);
document.addEventListener("click", callback);

// document.addEventListener("touchend", callback);
// document.addEventListener("touchcancel", callback);
// document.addEventListener("touchmove", callback);

// document.addEventListener("touchstart", handleStart);
// document.addEventListener("touchend", handleEnd);
// document.addEventListener("touchcancel", handleCancel);
// document.addEventListener("touchmove", handleMove);
