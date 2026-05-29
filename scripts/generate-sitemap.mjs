import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://cheapjusticeofindia.com";
const CONTENT_DIR = path.join(process.cwd(), "content/articles");

function generateSitemap() {
  const pages = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
  ];


  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(".mdx", "");
      pages.push({
        loc: `/articles/${slug}/`,
        priority: "0.8",
        changefreq: "monthly",
        lastmod: data.date || undefined,
      });
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${p.lastmod || today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), xml);
  console.log(`Sitemap generated with ${pages.length} URLs.`);
}

generateSitemap();
