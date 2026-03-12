export function Banner({
  banner_header,
  banner_img,
  banner_button
}: {
  banner_header?: string | null;
  banner_img?: string | null;
  banner_button?: { button_text?: string | null; button_url?: string | null } | null;
}) {
  return (
    <section className="banner min-h-screen flex items-center justify-center bg-gray-100 relative">
      {banner_img && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={banner_img}
            alt={banner_header || "Banner"}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-4xl">
        {banner_header && (
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            {banner_header}
          </h1>
        )}

        {banner_button?.button_text && (
          <a
            href={banner_button.button_url ?? undefined}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            {banner_button.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
