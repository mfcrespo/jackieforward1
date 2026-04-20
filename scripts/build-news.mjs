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

function normalizeBool(value) {
  return value === true || value === "true" || value === 1 || value === "1" || value === "yes";
}

function youtubeId(url = "") {
  if (!url) return "";
  const watch = url.match(/[?&]v=([^&#]+)/);
  if (watch) return watch[1];
  const short = url.match(/youtu\.be\/([^?&#/]+)/);
  if (short) return short[1];
  const embed = url.match(/youtube\.com\/embed\/([^?&#/]+)/);
  if (embed) return embed[1];
  return "";
}

function videoPoster(url = "") {
  const id = youtubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return "";
}

function videoEmbedUrl(url = "") {
  const id = youtubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}`;
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1].split("?")[0];
    return `https://player.vimeo.com/video/${id}`;
  }
  return url || "";
}

async function fetchOgImage(url) {
  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await response.text();
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return match ? match[1] : null;
  } catch (error) {
    console.warn(`Could not fetch og:image from ${url}`);
    return null;
  }
}

async function main() {
  if (!fs.existsSync(newsDir)) {
    console.error("content/news folder not found.");
    process.exit(1);
  }

  const files = fs.readdirSync(newsDir).filter((file) => file.endsWith(".json"));
  const rawItems = files.map((file) => safeReadJson(path.join(newsDir, file))).filter(Boolean);

  const items = [];
  for (const item of rawItems) {
    const explicitImage = item.image || "";
    const poster = item.video_url ? videoPoster(item.video_url) : "";
    const ogImage = item.url ? await fetchOgImage(item.url) : "";
    const cardImage = explicitImage || poster || ogImage || "";

    items.push({
      ...item,
      featured: normalizeBool(item.featured),
      video_embed_url: item.video_url ? videoEmbedUrl(item.video_url) : "",
      card_image: cardImage
    });
  }

  items.sort((a, b) => new Date(b.date || "1900-01-01") - new Date(a.date || "1900-01-01"));

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify({ items }, null, 2), "utf8");
  console.log(`Built ${outputFile} with ${items.length} news items.`);
}

main();
