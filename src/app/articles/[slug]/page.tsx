import { notFound } from "next/navigation";
import { getAllArticles, getArticleContent } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleContent(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.meta.title} — Cheap Justice of India`,
    description: article.meta.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleContent(slug);
  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 text-xs text-muted mb-4">
          <span className="uppercase font-semibold text-accent">
            {article.meta.category}
          </span>
          <span>&middot;</span>
          <time>{article.meta.date}</time>
          <span>&middot;</span>
          <span>{article.meta.readingTime}</span>
        </div>
        <h1 className="text-4xl font-black text-foreground mb-4">
          {article.meta.title}
        </h1>
        <p className="text-lg text-muted">{article.meta.description}</p>
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <span className="text-sm text-muted">
            By{" "}
            <span className="text-foreground font-medium">
              {article.meta.author}
            </span>
          </span>
          <div className="flex gap-2">
            {article.meta.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="prose prose-invert prose-red max-w-none">
        {article.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="text-2xl font-bold text-foreground mt-8 mb-4"
              >
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3
                key={i}
                className="text-xl font-bold text-foreground mt-6 mb-3"
              >
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <li key={i} className="text-muted ml-4 mb-1">
                {line.replace("- ", "")}
              </li>
            );
          }
          if (line.startsWith("> ")) {
            return (
              <blockquote
                key={i}
                className="border-l-4 border-accent pl-4 italic text-muted my-4"
              >
                {line.replace("> ", "")}
              </blockquote>
            );
          }
          if (line.trim() === "") return <br key={i} />;
          return (
            <p key={i} className="text-muted leading-relaxed mb-4">
              {line}
            </p>
          );
        })}
      </div>
    </article>
  );
}
