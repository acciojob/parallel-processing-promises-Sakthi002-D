const output = document.getElementById("output");

const loading = document.createElement("div");
loading.id = "loading";
loading.textContent = "Loading...";

const errorDiv = document.createElement("div");
errorDiv.id = "error";

document.body.insertBefore(loading, output);
document.body.insertBefore(errorDiv, output);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

async function downloadImages() {
  try {
    loading.style.display = "block";

    const downloadedImages = await Promise.all(
      images.map((image) => downloadImage(image.url))
    );

    loading.style.display = "none";

    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });
  } catch (error) {
    loading.style.display = "none";
    errorDiv.textContent = error;
  }
}

downloadImages();