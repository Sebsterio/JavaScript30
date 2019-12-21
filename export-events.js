console.log("testing window.parent.postMessage");

const doc = document.documentElement;

function callback(e) {
	console.log("IF. e:");
	console.log(e);
	const message = "hellow from iframe";
	targetOrigin = "*";
	window.parent.postMessage(message, targetOrigin);
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
