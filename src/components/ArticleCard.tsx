import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="group border border-border rounded-lg p-6 bg-card-bg hover:border-accent/50 transition-colors">
      <div className="flex items-center gap-3 text-xs text-muted mb-3">
        <span className="uppercase font-semibold text-accent">
          {article.category}
        </span>
        <span>&middot;</span>
        <time>{article.date}</time>
        <span>&middot;</span>
        <span>{article.readingTime}</span>
      </div>

      <Link href={`/articles/${article.slug}`}>
        <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
          {article.title}
        </h2>
      </Link>

      <p className="text-sm text-muted leading-relaxed mb-4">
        {article.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">By {article.author}</span>
        <div className="flex gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
