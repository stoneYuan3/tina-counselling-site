import client from "@/tina/__generated__/client";
import { Banner } from "@/components/blocks/Banner";
import { FeaturedQuote } from "@/components/blocks/FeaturedQuote";
import { TwoColumnParagraph } from "@/components/blocks/TwoColumnParagraph";
import { CTA } from "@/components/blocks/CTA";

export default async function HomePage() {
  // Fetch the home page data from Tina
  const result = await client.queries.home({
    relativePath: "home.md"  // This is the filename in content/pages/
  });

  const { title, page_blocks } = result.data.home;

  return (
    <main className="min-h-screen">
      {/* Render each block based on its template type */}
      {page_blocks?.map((block, index) => {
        if (!block) return null;

        // Use __typename to identify block type
        switch (block.__typename) {
          case "HomePage_blocksBanner_home":
            return <Banner key={index} {...block} />;

          case "HomePage_blocksFeatured_quote":
            return <FeaturedQuote key={index} {...block} />;

          case "HomePage_blocksTwocol_paragraph":
            return <TwoColumnParagraph key={index} {...block} />;

          case "HomePage_blocksCta":
            return <CTA key={index} {...block} />;

          default:
            return null;
        }
      })}
    </main>
  );
}