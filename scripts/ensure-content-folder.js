const fs = require("fs");
const path = require("path");

const contentPath = path.join(__dirname, "../public/content/en");

if (!fs.existsSync(contentPath)) {
  fs.mkdirSync(contentPath, { recursive: true });
  console.log("Created missing folder:", contentPath);
}
