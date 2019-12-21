const doc = document.documentElement;

function callback(e) {
	console.log(e);
	doc.setAttribute("data-export-event", "touchstart");
	document.dispatchEvent(
		new CustomEvent("test", {
			detail: { prop: "test" }
		})
	);
}

document.addEventListener("touchstart", callback);

document.addEventListener("test", () =>
	console.log("test event registered within iframe")
);

// document.addEventListener("touchend", callback);
// document.addEventListener("touchcancel", callback);
// document.addEventListener("touchmove", callback);

// document.addEventListener("touchstart", handleStart);
// document.addEventListener("touchend", handleEnd);
// document.addEventListener("touchcancel", handleCancel);
// document.addEventListener("touchmove", handleMove);
