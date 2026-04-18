import fs from "fs";
import path from "path";

const eventsDir = path.join(process.cwd(), "content", "events");
const outputDir = path.join(process.cwd(), "data");
const outputFile = path.join(outputDir, "events.json");

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
  if (!fs.existsSync(eventsDir)) {
    console.error("content/events folder not found.");
    process.exit(1);
  }

  const files = fs
    .readdirSync(eventsDir)
    .filter((file) => file.endsWith(".json"));

  const items = files
    .map((file) => safeReadJson(path.join(eventsDir, file)))
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = new Date(a.date || "9999-12-31");
      const dateB = new Date(b.date || "9999-12-31");
      return dateA - dateB;
    });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    outputFile,
    JSON.stringify({ items }, null, 2),
    "utf8"
  );

  console.log(`Built ${outputFile} with ${items.length} events.`);
}

main();