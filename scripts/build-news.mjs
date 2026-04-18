import fs from "fs";
import path from "path";

const newsDir = path.join(process.cwd(), "content", "news");
const outputDir = path.join(process.cwd(), "data");
const outputFile = path.join(outputDir, "news.json");

function safeReadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  if (!fs.existsSync(newsDir)) {
    console.error("content/news folder not found.");
    process.exit(1);
  }

  const files = fs
    .readdirSync(newsDir)
    .filter((file) => file.endsWith(".json"));

  const items = files
    .map((file) => safeReadJson(path.join(newsDir, file)))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date || "1900-01-01") - new Date(a.date || "1900-01-01"));

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify({ items }, null, 2), "utf8");

  console.log(`Built ${outputFile} with ${items.length} news items.`);
}

main();