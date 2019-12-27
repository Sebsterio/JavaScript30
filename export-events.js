(function() {
	// distance between touchStart and touchEnd to be considered a swipe
	const SWIPE_SENSITIVITY = 15;

	// for debouncing scroll events - set high due to trackpad scroll inertia (the only solution I found)
	const SCROLL_MIN_INTERVAL = 200;
	const SCROLL_EDGE_INTERVAL = 2000;

	function getDocHeight() {
		const D = document;
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
		console.log("touchstart");
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
		if (!message) return;
		window.parent.postMessage(message, "*");
		console.log(message);
	}

	// problem: trackpad scroll event inertia keeps sending scroll event messages
	// attempted solution: window.parent: on scroll out, kill iframe script --> no success:
	// add attribute 'sandbox' --> no effect;
	// iframe src='' --> no effect

	let timeout;
	let ready = true;
	function debounce(e, callback) {
		if (ready) {
			ready = false;
			clearTimeout(timeout);

			// edge scroll -> long interval
			if (isDocAtScrollEnd() || isDocAtScrollStart())
				timeout = setTimeout(() => {
					ready = true;
				}, SCROLL_EDGE_INTERVAL);
			// mid-doc scroll -> short interval
			else
				timeout = setTimeout(() => {
					ready = true;
				}, SCROLL_MIN_INTERVAL);
			callback(e);
		} else {
			console.log("not ready");
		}
	}

	document.body.addEventListener("touchstart", handleTouchStart);
	document.body.addEventListener("touchend", handleTouchEnd);
	document.body.addEventListener("wheel", e => debounce(e, handleWheel));
})();
