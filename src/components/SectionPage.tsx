import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

type SectionPageProps = {
  title: string;
  subtitle: string;
  articles: ArticleMeta[];
};

export default function SectionPage({
  title,
  subtitle,
  articles,
}: SectionPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-foreground mb-3">{title}</h1>
        <p className="text-lg text-muted">{subtitle}</p>
        <div className="h-1 w-16 bg-accent mt-4" />
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-lg p-12 text-center bg-card-bg">
          <p className="text-muted text-lg mb-2">No articles yet.</p>
          <p className="text-sm text-muted">
            This section is coming soon. The truth can&apos;t stay hidden
            forever.
          </p>
        </div>
      )}
    </div>
  );
}
