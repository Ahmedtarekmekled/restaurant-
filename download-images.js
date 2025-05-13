const fs = require("fs");
const https = require("https");
const path = require("path");

const imagesDir = path.join(__dirname, "public", "images");

// Ensure the directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Images to download
const images = [
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    filename: "restaurant-hero.jpg",
    description: "Restaurant hero image",
  },
  {
    url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
    filename: "about-story.jpg",
    description: "Restaurant story image",
  },
  {
    url: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf",
    filename: "about-philosophy.jpg",
    description: "Food philosophy image",
  },
  {
    url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c",
    filename: "about-team.jpg",
    description: "Restaurant team image",
  },
  {
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    filename: "about-commitment.jpg",
    description: "Sustainability commitment image",
  },
];

// Download function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);

    https
      .get(`${url}?auto=format&fit=crop&w=1200&q=80`, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve(filePath);
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        console.error(`❌ Error downloading ${filename}: ${err.message}`);
        reject(err);
      });
  });
}

// Download all images
async function downloadAllImages() {
  console.log("📥 Downloading images for the About Us page...");

  try {
    const promises = images.map((image) =>
      downloadImage(image.url, image.filename)
    );

    await Promise.all(promises);
    console.log("🎉 All images downloaded successfully!");
  } catch (error) {
    console.error("⚠️ Error downloading images:", error);
  }
}

downloadAllImages();
