const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Define the pages to screenshot
const pages = [
  { name: "home", path: "/" },
  { name: "dashboard", path: "/dashboard" },
];

// Define viewport sizes
const viewports = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 375, height: 812 }, // iPhone X size
};

async function takeScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, "../screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // Launch browser
  const browser = await puppeteer.launch({
    headless: "new", // Use new headless mode
  });

  try {
    // Create a new page
    const page = await browser.newPage();

    // Set default timeout
    page.setDefaultTimeout(30000);

    // Loop through each page
    for (const pageInfo of pages) {
      console.log(`Processing ${pageInfo.name}...`);

      // Loop through each viewport size
      for (const [device, viewport] of Object.entries(viewports)) {
        console.log(`Taking ${device} screenshot...`);

        // Set viewport
        await page.setViewport(viewport);

        // Navigate to the page
        await page.goto(`http://localhost:3000${pageInfo.path}`, {
          waitUntil: "networkidle0", // Wait until network is idle
        });

        // Wait for any animations to complete
        await page.waitForTimeout(1000);

        // Take screenshot
        const screenshotPath = path.join(
          screenshotsDir,
          `${pageInfo.name}-${device}.png`
        );
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });

        console.log(`Saved ${device} screenshot to ${screenshotPath}`);
      }
    }
  } catch (error) {
    console.error("Error taking screenshots:", error);
  } finally {
    // Close browser
    await browser.close();
  }
}

// Run the script
takeScreenshots().catch(console.error);
