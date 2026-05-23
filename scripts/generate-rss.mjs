import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://cheapjusticeofindia.com";
const CONTENT_DIR = path.join(process.cwd(), "content/articles");

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateRss() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log("No articles directory found, skipping RSS generation.");
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const items = files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data } = matter(raw);
      const slug = filename.replace(".mdx", "");
      return {
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || "",
        slug,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cheap Justice of India</title>
    <link>${SITE_URL}</link>
    <description>Real facts about India's judiciary — delivered with satirical honesty.</description>
    <language>en-in</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/articles/${item.slug}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <guid>${SITE_URL}/articles/${item.slug}</guid>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), "public/rss.xml"), rss);
  console.log(`RSS feed generated with ${items.length} items.`);
}

generateRss();
