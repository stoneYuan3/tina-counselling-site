import { TinaMarkdown } from "tinacms/dist/rich-text";

export function CTA({
  cta_button,
  cta_img,
  cta_title,
  cta_body
}: {
  cta_button?: { button_text?: string | null, button_url?: string | null } | null,
  cta_img?: any,
  cta_title?: string | null,
  cta_body?: any
}) {
  return (
    <section className="cta-block flex items-center gap-[32px] bg-[#3DA4B3] max-w-[1080px] m-auto rounded-lg overflow-clip">
      <div className="flex flex-col gap-[24px] p-8 text-white">
        <h3>{cta_title}</h3>
        <TinaMarkdown content={cta_body} />
        {cta_button?.button_text && (
          <a href={cta_button.button_url ?? undefined} className="w-fit bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
            {cta_button.button_text}
          </a>
        )}
      </div>
      <img
        src={cta_img}
        alt={"cta"}
        className="w-full h-full object-cover max-h-[300px]"
      />
    </section>
  );
}
