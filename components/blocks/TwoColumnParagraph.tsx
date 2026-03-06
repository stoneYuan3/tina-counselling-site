import { TinaMarkdown } from "tinacms/dist/rich-text";

export function TwoColumnParagraph({
  title,
  body
}: {
  title?: any;
  body?: any;
}) {
  return (
    <section className="two-column-paragraph py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column - Title */}
        <div className="left-column">
          <div className="prose prose-lg prose-headings:text-gray-900">
            <TinaMarkdown content={title} />
          </div>
        </div>

        {/* Right Column - Body with orange bold text */}
        <div className="right-column">
          <div className="prose prose-lg prose-strong:text-orange-500 prose-strong:font-semibold">
            <TinaMarkdown content={body} />
          </div>
        </div>
      </div>
    </section>
  );
}
