import { TinaMarkdown } from "tinacms/dist/rich-text"

export function ServiceIntro({
  service_intro_title,
  service_intro_text
}: {
  service_intro_title?: string | null
  service_intro_text?: any
}) {
  return (
    <section className="service-intro py-16 px-4 max-w-[1080px] m-auto">
      {service_intro_title && <h2>{service_intro_title}</h2>}
      <TinaMarkdown content={service_intro_text} />
    </section>
  )
}
