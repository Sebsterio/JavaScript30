const SWIPE_SENSITIVITY = 15;

let touchstartY = 0;
let touchendY = 0;

function handleTouchStart(e) {
	touchstartY = e.touches[0].pageY;
}
function handleTouchEnd(e) {
	touchendY = e.changedTouches[0].pageY;
	const deltaY = touchendY - touchstartY;
	const message =
		deltaY > SWIPE_SENSITIVITY
			? "swipe-down"
			: deltaY < SWIPE_SENSITIVITY * -1
			? "swipe-down"
			: "touch";
	targetOrigin = "*";
	window.parent.postMessage(message, targetOrigin);
}

document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handleTouchEnd);
// document.addEventListener("touchmove", handleTouchMove);
