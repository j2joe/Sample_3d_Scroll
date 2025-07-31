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
  SCROLL TRIGGER SETTINGS
  -----------------------
  Adjust 'framesPerScroll' to control how many frames advance per scroll event.
  For example, set framesPerScroll = 2 for 2 frames per scroll, 0.5 for half frame per scroll.
*/
const framesPerScroll = 0.10; // <-- Change this value to adjust frames rendered per scroll event

let lastKnownScrollY = window.scrollY;
let currentFrameIndex = 0;

function renderFrame(index) {
  const image = images[index];
  if (image?.complete) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

// Use scroll event as a trigger to advance frames
window.addEventListener("scroll", () => {
  const scrollDelta = window.scrollY - lastKnownScrollY;
  lastKnownScrollY = window.scrollY;

  // Calculate how many frames to advance based on scroll delta and framesPerScroll
  let frameAdvance = Math.round(scrollDelta * framesPerScroll);
  if (frameAdvance !== 0) {
    currentFrameIndex = Math.min(
      frameCount - 1,
      Math.max(0, currentFrameIndex + frameAdvance)
    );
    renderFrame(currentFrameIndex);
  }
});

// Ensure correct frame on resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderFrame(currentFrameIndex);
});
