import { TinaMarkdown } from "tinacms/dist/rich-text";

export function CTA({ 
  button,
  button_link,
  cta_img,
  cta_title,
  cta_body
}: { 
  button?: string | null,
  button_link?: string | undefined,
  cta_img?: any,
  cta_title?: string | null,
  cta_body?: any 
}) {
  if (!button) return null;

  return (
    <section className="cta-block py-16 px-4 bg-orange-50">
      <div className="flex flex-col">
        <h3>{cta_title}</h3>
        <TinaMarkdown content={cta_body} />
        <a href={button_link} className="w-fit bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
          {button}
        </a>
      </div>
      <img
        src={cta_img}
        alt={"cta"}
        className="w-full h-full object-cover opacity-40"
      />
    </section>
  );
}
