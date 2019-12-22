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
		const message =
			deltaY > SWIPE_SENSITIVITY
				? "swipe-down"
				: deltaY < -SWIPE_SENSITIVITY
				? "swipe-up"
				: "touch";
		window.parent.postMessage(message, "*");
	}

	function handleWheel(e) {
		const message =
			e.deltaY > 0 ? "scroll-down" : e.deltaY < 0 ? "scroll-up" : "";
		if (!message) return;
		window.parent.postMessage(message, "*");
	}

	document.addEventListener("touchstart", handleTouchStart);
	document.addEventListener("touchend", handleTouchEnd);
	document.addEventListener("wheel", handleWheel);
})();
