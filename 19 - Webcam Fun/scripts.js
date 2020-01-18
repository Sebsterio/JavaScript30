const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const select = document.querySelector("#select-filter");
const inputOffset = document.querySelector("#input-offset");
const checkbox2d = document.querySelector("#checkbox-2d");
const inputs = document.querySelectorAll(".rgb input");
const inputAlpha = document.querySelector("#input-alpha");

// Input element values
let activeFilter;
let offset;
let offset2d;
let levels = {};
let alpha;

// config
const FPS = 60;
const invert = true;

// aux
let interval;

// Feed webcam stream into <video>
function startStream() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch(err => new Error(err));
}

// Feed <video> stream into <canvas>
function paintToCanvas() {
	clearInterval(interval);

	let posX = 0;
	let posY = 0;
	const width = video.videoWidth;
	const height = video.videoHeight;

	canvas.width = width;
	canvas.height = height;
	if (invert) {
		ctx.scale(-1, 1);
		posX = -width;
	}

	// Apply a filter to canvas image
	interval = setInterval(() => {
		ctx.drawImage(video, posX, posY, width, height);
		let imageData = ctx.getImageData(0, 0, width, height);
		imageData = filters[activeFilter](imageData);
		ctx.putImageData(imageData, 0, 0);
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
	link.innerHTML = `<img src='${data}' alt='Webcam screenshot'/>`;
	link.setAttribute("download", "webcam-screenshot");

	strip.insertBefore(link, strip.firstChild);
}

function updateFilter() {
	activeFilter = this.value;
	ctx.globalAlpha = 1; // lazy reset

	// Toggle input elements that alter selected filter
	document.body.classList.remove(
		"filter-alpha",
		"filter-rgbSplit",
		"filter-greenScreen"
	);
	document.body.classList.add("filter-" + this.value);
}

// --------------------- Filters ------------------------

const filters = {
	redEffect(img) {
		for (let i = 0; i < img.data.length; i += 4) {
			img.data[i + 0] += 100; // Red
			img.data[i + 1] -= 50; // Green
			img.data[i + 2] -= 50; // Blue
		}
		return img;
	},

	rgbSplit(img) {
		const newPixels = new Uint8ClampedArray(img.data.length);
		for (let i = 0; i < img.data.length; i += 4) {
			// Red -> move left
			newPixels[i + 0] = img.data[i + 0 + 4 * offset];

			// Green -> move up OR no change
			newPixels[i + 1] = offset2d
				? img.data[i + 1 + img.width * 4 * offset]
				: img.data[i + 1];

			// Blue -> move right
			newPixels[i + 2] = img.data[i + 2 - 4 * offset];

			// Alphab -> no change
			newPixels[i + 3] = img.data[i + 3];
		}
		return new ImageData(newPixels, img.width, img.height);
	},

	greenScreen(pixels) {
		for (let i = 0; i < pixels.data.length; i += 4) {
			if (
				pixels.data[i + 0] >= levels.rmin &&
				pixels.data[i + 0] <= levels.rmax &&
				pixels.data[i + 1] >= levels.gmin &&
				pixels.data[i + 1] <= levels.gmax &&
				pixels.data[i + 2] >= levels.bmin &&
				pixels.data[i + 2] <= levels.bmax
			) {
				pixels.data[i + 3] = 0; // alpha
			}
		}
		return pixels;
	},

	alpha(pixels) {
		ctx.globalAlpha = Number(alpha);
		return pixels;
	}
};

// --------------------- Event listeners ------------------------

// feed video to canvas when stream started
video.addEventListener("canplay", paintToCanvas);

// Select filter
select.addEventListener("input", updateFilter);

// Adjust rgbSplit offset
inputOffset.addEventListener("input", () => (offset = inputOffset.value));

// Toggle 2d rgbSPlit
checkbox2d.addEventListener("input", () => (offset2d = checkbox2d.checked));

// Adjust green screen color range
inputs.forEach(input =>
	input.addEventListener("input", () => (levels[input.name] = input.value))
);

// Adjust alpha filter intensity
inputAlpha.addEventListener("input", () => (alpha = inputAlpha.value));

// ------------------------- Run app ---------------------------

function runApp() {
	activeFilter = select.value;
	offset = inputOffset.value;
	offset2d = checkbox2d.checked;
	alpha = inputAlpha.value;
	inputs.forEach(input => {
		levels[input.name] = input.value;
	});

	startStream();
}

runApp();
