import Link from "next/link"

export function Header({ header }: {
  header?: {
    site_title?: string | null
    nav?: Array<{ label?: string | null; url?: string | null } | null> | null
  } | null
}) {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-[1080px] m-auto flex flex-col items-center justify-between px-4 py-4 gap-[25px]">
        {header?.site_title && (
          <Link href="/">
            <h1>{header.site_title}</h1>
          </Link>
        )}
        <nav className="flex gap-6">
          {header?.nav?.map((item, index) => {
            if (!item?.label || !item?.url) return null
            return (
              <Link
                key={index}
                href={item.url}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
