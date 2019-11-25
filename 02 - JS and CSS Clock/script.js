function updateClock() {
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const h = now.getHours();

  const secDeg = -90 + (sec / 60) * 360;
  const minDeg = -90 + (min / 60) * 360;
  const hDeg = -90 + (h / 12) * 360;

  secHand.style.transform = `translate(100%, 0) rotate(${secDeg}deg)`;
  minHand.style.transform = `translate(100%, 0) rotate(${minDeg}deg) scaleX(.8)`;
  hHand.style.transform = `translate(100%, 0) rotate(${hDeg}deg) scaleX(.6)`;
}

const secHand = document.getElementById("hand-sec");
const minHand = document.getElementById("hand-min");
const hHand = document.getElementById("hand-hour");

setInterval(updateClock, 1000);

// aux
function log(msg) {
  console.log(msg);
}
