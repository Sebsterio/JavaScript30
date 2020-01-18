const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const FPS = 60;

function startStream() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch(err => new Error("Webcam not available"));
}
let interval;
function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	ctx.globalAlpha = 0.03;

	interval = setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		pixels = applyFilter(pixels, width);
		ctx.putImageData(pixels, 0, 0);
	}, 1000 / FPS);
}

function killApp() {
	clearInterval(interval);
}

function takePhoto() {
	// play sound
	snap.currentTime = 0;
	snap.play();

	// get data
	const data = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", "handsome");
	link.innerHTML = `<img src=${data} alt="Handsome Man" />`;

	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] *= 3 / 2;
		pixels.data[i + 1] *= 1 / 2;
		pixels.data[i + 2] *= 1 / 2;
	}
	return pixels;
}

function rgbSplit(pixels, width) {
	const row = width * 4;
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0]; // RED
		pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
		pixels.data[i - 550] = pixels.data[i + 2]; // Blue
	}
	return pixels;
}

const inputs = document.querySelectorAll(".rgb input");
levels = {};
function greenScreen(pixels) {
	inputs.forEach(input => {
		levels[input.name] = input.value;
	});
	for (let i = 0; i < pixels.data.length; i += 4) {
		if (
			pixels.data[i + 0] >= levels.rmin &&
			pixels.data[i + 0] <= levels.rmax &&
			pixels.data[i + 1] >= levels.gmin &&
			pixels.data[i + 1] <= levels.gmax &&
			pixels.data[i + 2] >= levels.bmin &&
			pixels.data[i + 2] <= levels.bmax
		) {
			// take it out!
			pixels.data[i + 3] = 0;
		}
	}
	return pixels;
}

function applyFilter(pixels, width) {
	return greenScreen(pixels);
}

video.addEventListener("canplay", paintToCanvas);

startStream();
