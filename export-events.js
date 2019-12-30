// This function allows the page that includes it to send scroll events to it's host while embedded as an iframe.
// The messages allow the host page to scroll to the next/previous iframe, which wouldn't be possible otherwise as it wouldn't register scroll events
// scroll-to-next-page logic is handled here as trackpad scroll inertia requires the scroll function to be debounced, which would make sending low level messages ('scrolled-up-at-top-edge' rather than 'prev') messy.

// Problem: trackpad scroll event inertia keeps sending scroll event messages
// attempted solutions: window.parent: on scroll out, kill iframe script
// add attribute 'sandbox' --> no effect;
// iframe src='' --> no effect
// final solution: debounce scroll-to-next-page messages --> works but will freeze the scroll functionality when user scrolls out and immediatley back into the same frame within 2 seconds.

(function() {
	// -------------- DOC SCROLL POSITION ----------------

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

	// ------------------- SWIPE -------------------

	// distance between touchStart and touchEnd to be considered a swipe
	const SWIPE_SENSITIVITY = 15;

	let touchstartY = 0;
	function handleTouchStart(e) {
		touchstartY = e.touches[0].pageY;
	}

	function handleTouchEnd(e) {
		const touchendY = e.changedTouches[0].pageY;
		const deltaY = touchendY - touchstartY;
		if (isDocAtScrollEnd() && deltaY < -SWIPE_SENSITIVITY) {
			window.parent.postMessage("next", "*");
		} else if (isDocAtScrollStart() && deltaY > SWIPE_SENSITIVITY) {
			window.parent.postMessage("prev", "*");
		}
		// const message =
		// 	deltaY > SWIPE_SENSITIVITY
		// 		? isDocAtScrollStart()
		// 			? "prev"
		// 			: ""
		// 		: deltaY < -SWIPE_SENSITIVITY
		// 		? isDocAtScrollEnd()
		// 			? "next"
		// 			: ""
		// 		: "touch";
		// if (message) window.parent.postMessage(message, "*");
	}

	// ------------------- SCROLL -------------------

	// for debouncing scroll event messages - set high due to trackpad scroll inertia (the only solution I found)
	const SCROLL_MESSAGE_INTERVAL = 2000;

	let timeout;
	let ready = true;

	function debouncedMessage(message) {
		ready = false;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			ready = true;
		}, SCROLL_MESSAGE_INTERVAL);

		window.parent.postMessage(message, "*");
	}

	// send message only when doc is scrolled to the top/bottom edge and user is scrolling towards the edge
	function handleWheel(e) {
		if (!ready) return;
		if (isDocAtScrollEnd() && e.deltaY > 0) {
			debouncedMessage("next");
		} else if (isDocAtScrollStart() && e.deltaY < 0) {
			debouncedMessage("prev");
		}
	}

	// ------------------- LISTENERS -------------------

	// use `document` and not `window` in case some projects' <html> height is not 100vh
	document.addEventListener("touchstart", handleTouchStart);
	document.addEventListener("touchend", handleTouchEnd);
	document.addEventListener("wheel", handleWheel);
})();
