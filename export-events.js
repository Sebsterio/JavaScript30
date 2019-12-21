(function() {
	// distance between touchStart and touchEnd to be considered a swipe
	const SWIPE_SENSITIVITY = 15;

	let touchstartY = 0;

	function handleTouchStart(e) {
		touchstartY = e.touches[0].pageY;
	}
	function handleTouchEnd(e) {
		const touchendY = e.changedTouches[0].pageY;
		const deltaY = touchendY - touchstartY;
		console.log(deltaY);
		const message =
			deltaY > SWIPE_SENSITIVITY
				? "swipe-down"
				: deltaY < -SWIPE_SENSITIVITY
				? "swipe-up"
				: "touch";
		console.log(message);
		targetOrigin = "*";
		window.parent.postMessage(message, targetOrigin);
	}

	document.addEventListener("touchstart", handleTouchStart);
	document.addEventListener("touchend", handleTouchEnd);
})();
