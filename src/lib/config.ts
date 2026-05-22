export const siteConfig = {
  name: "Cheap Justice of India",
  tagline: "They judge you. We judge them.",
  description:
    "A satirical website exposing the rot in India's judiciary through humor, facts, and fearless commentary.",
  url: "https://cheapjusticeofindia.com",
  disclaimer:
    "This is a satirical publication. All factual claims are sourced from publicly available records. Views expressed are opinions protected under Article 19(1)(a) of the Indian Constitution.",
};

export type SectionConfig = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
};

export const sections: SectionConfig[] = [
  {
    slug: "corruption-files",
    title: "The Corruption Files",
    subtitle: "Exposing financial and ethical corruption within the judiciary",
    category: "corruption",
  },
  {
    slug: "loophole-engineers",
    title: "Loophole Engineers",
    subtitle: "How judges exploit and create legal loopholes",
    category: "loopholes",
  },
  {
    slug: "flawed-judgments",
    title: "Flawed Judgments Hall of Fame",
    subtitle:
      "A satirical archive of the most absurd, contradictory, or harmful judgments",
    category: "flawed-judgments",
  },
  {
    slug: "revolving-door",
    title: "The Revolving Door",
    subtitle: "Post-retirement careers that expose pre-retirement bias",
    category: "revolving-door",
  },
  {
    slug: "collegium-circus",
    title: "The Collegium Circus",
    subtitle: "India's opaque system of judicial appointments",
    category: "collegium",
  },
  {
    slug: "opinion",
    title: "Contempt of Common Sense",
    subtitle: "Satirical opinion pieces and commentary",
    category: "opinion",
  },
];
