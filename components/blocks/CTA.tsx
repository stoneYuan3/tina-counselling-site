export function CTA({ button }: { button?: string | null }) {
  if (!button) return null;

  return (
    <section className="cta-block py-16 px-4 bg-orange-50">
      <div className="max-w-4xl mx-auto text-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
          {button}
        </button>
      </div>
    </section>
  );
}
