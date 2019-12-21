console.log("testing ....");

const doc = document.documentElement;

function callback(e) {
	console.log("IF. e:" + e);
	const targetWindow = window.opener;
	const message = "hellow from iframe";
	targetOrigin = "*";
	targetWindow.postMessage(message, targetOrigin);
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
