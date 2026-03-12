import Link from "next/link"
import { TinaMarkdown } from "tinacms/dist/rich-text"

export function Footer({ footer, header }: {
  footer?: {
    crisis_notice?: any
    land_acknowledgement?: string | null
    copyright?: string | null
  } | null
  header?: {
    site_title?: string | null
    nav?: Array<{ label?: string | null; url?: string | null } | null> | null
  } | null
}) {
  return (
    <footer className="w-full bg-[#F5E6D3] text-gray-700 py-12">
      <div className="max-w-[1080px] m-auto px-4 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8">
          <div className="flex flex-col gap-4">
            {header?.site_title && <h3 className="font-bold">{header.site_title}</h3>}
            {header?.nav && (
              <nav className="grid grid-cols-2 gap-x-8 gap-y-2">
                {header.nav.map((item, index) => {
                  if (!item?.label || !item?.url) return null
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            )}
          </div>
          {footer?.crisis_notice && (
            <div className="text-sm">
              <TinaMarkdown content={footer.crisis_notice} />
            </div>
          )}
        </div>
        {footer?.land_acknowledgement && (
          <p className="text-xs text-center italic">{footer.land_acknowledgement}</p>
        )}
        {footer?.copyright && (
          <p className="text-center text-sm">{footer.copyright}</p>
        )}
      </div>
    </footer>
  )
}
