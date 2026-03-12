import { TinaMarkdown } from "tinacms/dist/rich-text"

export function ServiceOptions({
  new_client,
  return_client,
  option_desc,
  book_link
}: {
  new_client?: { title?: string | null; center_body?: any } | null
  return_client?: { title?: string | null; center_body?: any } | null
  option_desc?: string | null
  book_link?: { button_text?: string | null; button_url?: string | null } | null
}) {
  return (
    <section className="service-options py-16 px-4 max-w-[1080px] m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {new_client && (
          <div className="text-center">
            {new_client.title && <h3>{new_client.title}</h3>}
            <TinaMarkdown content={new_client.center_body} />
          </div>
        )}
        {return_client && (
          <div className="text-center">
            {return_client.title && <h3>{return_client.title}</h3>}
            <TinaMarkdown content={return_client.center_body} />
          </div>
        )}
      </div>
      {option_desc && <p className="mt-8 text-center">{option_desc}</p>}
      {book_link?.button_text && (
        <div className="mt-8 text-center">
          <a
            href={book_link.button_url ?? undefined}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            {book_link.button_text}
          </a>
        </div>
      )}
    </section>
  )
}
