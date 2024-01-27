const pixelInput = document.getElementById('pixels');
let clearPixelAmount = 0;
pixelInput.addEventListener('input', (e) => {
  console.log('value:', e.target.value);
  //   clearPixelAmount = e.target.value;
});

// load image into canvas
const img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'cat.jpeg';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

img.onload = () => {
  const width = canvas.width;
  const height = canvas.height;
  const totalPixels = width * height;
  const pixelsToReveal = 20000;

  ctx.drawImage(img, 0, 0);

  // get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  const pixelsToDraw = generateUniqueRandomNumbers(pixelsToReveal, totalPixels);

  for (i = 0; i < pixelsToDraw.length; i++) {
    console.log('drawing pixel', pixelsToDraw[i]);
    const w = Math.floor(pixelsToDraw[i] / width);
    const h = pixelsToDraw[i] % height;
    imageData.data[pixelsToDraw[i] * 4] = data[pixelsToDraw[i] * 4];
    imageData.data[pixelsToDraw[i] * 4 + 1] = data[pixelsToDraw[i] * 4 + 1];
    imageData.data[pixelsToDraw[i] * 4 + 2] = data[pixelsToDraw[i] * 4 + 2];
    imageData.data[pixelsToDraw[i] * 4 + 3] = data[pixelsToDraw[i] * 4 + 3];
    draw(imageData, w, h);
  }

  //manipulate pixels
};

function generateUniqueRandomNumbers(n, m) {
  let set = new Set();
  while (set.size < n) {
    set.add(Math.floor(Math.random() * m));
  }
  return Array.from(set);
}
function draw(img, w, h) {
  ctx.putImageData(img, w, h, w, h, 1, 1);
}
