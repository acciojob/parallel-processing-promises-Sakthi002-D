const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject("Image failed to load");

    img.src = url;
  });
}

Promise.all(images.map(img => downloadImage(img.url)))
  .then(result => {
    result.forEach(img => output.appendChild(img));
  })
  .catch(err => {
    output.textContent = err;
  });