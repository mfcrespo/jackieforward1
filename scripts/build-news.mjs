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

function youtubeThumbnail(url = "") {
  if (!url) return null;
  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }
  return null;
}

function normalizeFeatured(value) {
  return value === true || value === 'true' || value === 'True' || value === 1 || value === '1';
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
    let image = item.image || null;
    let card_image = item.card_image || null;

    if (!image && item.video_url) {
      image = youtubeThumbnail(item.video_url) || image;
    }

    if ((!image || !card_image) && item.url) {
      const ogImage = await fetchOgImage(item.url);
      if (ogImage) {
        image = image || ogImage;
        card_image = card_image || ogImage;
      }
    }

    card_image = card_image || image || null;

    items.push({
      ...item,
      image,
      card_image,
      featured: normalizeFeatured(item.featured)
    });
  }

  items.sort((a, b) => new Date(b.date || '1900-01-01') - new Date(a.date || '1900-01-01'));

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify({ items }, null, 2), 'utf8');
  console.log(`Built ${outputFile} with ${items.length} news items.`);
}

main();
