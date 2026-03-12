import { TinaMarkdown } from "tinacms/dist/rich-text"

export function RatesPolicies({
  policy_title,
  policy_item
}: {
  policy_title?: string | null
  policy_item?: Array<{ title?: string | null; center_body?: any } | null> | null
}) {
  return (
    <section className="rates-policies py-16 px-4 max-w-[1080px] m-auto flex flex-col items-center gap-[64px]">
      {policy_title && <h2>{policy_title}</h2>}
      <div className="flex flex-col gap-[64px] max-w-[1080px] px-[64px]">
      {policy_item?.map((item, index) => {
        if (!item) return null
        return (
          <div key={index} className="grid grid-cols-[35%_65%]">
            {item.title && <h3>{item.title}</h3>}
            <div>
            <TinaMarkdown content={item.center_body} />
            </div>
          </div>
        )
      })}
      </div>
    </section>
  )
}
