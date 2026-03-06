export function FeaturedQuote({ line }: { line?: string | null }) {
  if (!line) return null;

  return (
    <section className="featured-quote py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <blockquote className="text-2xl md:text-3xl font-serif italic text-center text-gray-700">
          "{line}"
        </blockquote>
      </div>
    </section>
  );
}
