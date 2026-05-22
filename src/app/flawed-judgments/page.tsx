import { getArticlesByCategory } from "@/lib/articles";
import { sections } from "@/lib/config";
import SectionPage from "@/components/SectionPage";

const section = sections.find((s) => s.slug === "flawed-judgments")!;

export const metadata = {
  title: `${section.title} — Cheap Justice of India`,
  description: section.subtitle,
};

export default function FlawedJudgmentsPage() {
  const articles = getArticlesByCategory(section.category);
  return (
    <SectionPage
      title={section.title}
      subtitle={section.subtitle}
      articles={articles}
    />
  );
}
