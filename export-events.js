(function() {
	// distance between touchStart and touchEnd to be considered a swipe
	const SWIPE_SENSITIVITY = 15;

	// for debouncing scroll events
	const SCROLL_MIN_INTERVAL = 200;

	function getDocHeight() {
		var D = document;
		return Math.max(
			D.body.scrollHeight,
			D.documentElement.scrollHeight,
			D.body.offsetHeight,
			D.documentElement.offsetHeight,
			D.body.clientHeight,
			D.documentElement.clientHeight
		);
	}

	function isDocAtScrollStart() {
		return window.scrollY <= 0;
	}
	function isDocAtScrollEnd() {
		return window.scrollY + window.innerHeight >= getDocHeight();
	}

	let touchstartY = 0;
	function handleTouchStart(e) {
		touchstartY = e.touches[0].pageY;
	}
	function handleTouchEnd(e) {
		const touchendY = e.changedTouches[0].pageY;
		const deltaY = touchendY - touchstartY;
		const message =
			deltaY > SWIPE_SENSITIVITY
				? isDocAtScrollStart()
					? "swipe-down-edge"
					: "swipe-down"
				: deltaY < -SWIPE_SENSITIVITY
				? isDocAtScrollEnd()
					? "swipe-up-edge"
					: "swipe-up"
				: "touch";
		window.parent.postMessage(message, "*");
	}

	function handleWheel(e) {
		const message =
			e.deltaY > 0
				? isDocAtScrollEnd()
					? "scroll-down-edge"
					: "scroll-down" // not reliable!
				: e.deltaY < 0
				? isDocAtScrollStart()
					? "scroll-up-edge"
					: "scroll-up" // not reliable!
				: "";
		//console.log(message);
		if (!message) return;
		window.parent.postMessage(message, "*");
	}

	// problem: trackpad scroll event inertia keeps sending scroll event messages
	// attempted solution: window.parent: on scroll out, kill iframe script --> no success:
	// add attribute 'sandbox' --> no effect;
	// iframe src='' --> no effect

	let timeout;
	let ready = true;
	function debounce(e, callback) {
		if (ready) {
			console.log(e);
			ready = false;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				ready = true;
			}, SCROLL_MIN_INTERVAL);
			callback(e);
		}
	}

	document.addEventListener("touchstart", handleTouchStart);
	document.addEventListener("touchend", handleTouchEnd);
	document.addEventListener("wheel", e => debounce(e, handleWheel));
})();
