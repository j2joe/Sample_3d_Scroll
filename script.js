const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 301;
const images = [];
let currentFrame = index => `frames/frame${index.toString().padStart(4, '0')}.jpg`;

const img = new Image();
img.src = currentFrame(1);
img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height);

// Preload all images
for (let i = 1; i <= frameCount; i++) {
  const image = new Image();
  image.src = currentFrame(i);
  images.push(image);
}

/*
// Mouse scrolling speed
// Adjust the scroll sensitivity by changing the multiplier below.
// For example, set scrollMultiplier = 2 for double speed, 0.5 for half speed.
*/
const scrollMultiplier = 0.2; // <-- Change this value to adjust scrolling speed.5

function render() {
  const scrollTop = window.scrollY * scrollMultiplier;
  const maxScrollTop = (document.body.scrollHeight - window.innerHeight) * scrollMultiplier;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    const image = images[frameIndex];
    if (image?.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  });
}

window.addEventListener("scroll", render);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});
