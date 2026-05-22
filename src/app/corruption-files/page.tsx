import { getArticlesByCategory } from "@/lib/articles";
import { sections } from "@/lib/config";
import SectionPage from "@/components/SectionPage";

const section = sections.find((s) => s.slug === "corruption-files")!;

export const metadata = {
  title: `${section.title} — Cheap Justice of India`,
  description: section.subtitle,
};

export default function CorruptionFilesPage() {
  const articles = getArticlesByCategory(section.category);
  return (
    <SectionPage
      title={section.title}
      subtitle={section.subtitle}
      articles={articles}
    />
  );
}
