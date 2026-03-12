# Service Page Boilerplate Plan

## Goal

Create the Next.js page, client component, and block components for the **Service** page collection defined in `tina/config.ts`. Follow the same architecture used by the Home and About pages.

---

## Architecture Reference

Each page in this project follows a 3-layer pattern:

| Layer | Home Example | About Example |
|---|---|---|
| **Content file** (markdown) | `content/home/home.md` | `content/about/about.md` |
| **Server component** (data fetching) | `app/page.tsx` | `app/about/page.tsx` |
| **Client component** (rendering + live edit) | `app/client-page.tsx` | `app/about/client-page.tsx` |
| **Block components** | `components/blocks/Banner.tsx`, etc. | `components/blocks/PageBanner.tsx`, etc. |

The service page will follow this same pattern.

---

## Files to Create

### 1. `content/service/service.md`

Starter content file with frontmatter matching the service collection schema.

```yaml
---
title: Service
page_blocks:
  - page_banner_img: /Rectangle 23.png
    page_banner_title: Services
    _template: page_banner
---
```

### 2. `app/service/page.tsx`

Server component that fetches TinaCMS data. Copy the pattern from `app/about/page.tsx`:

```tsx
import client from "@/tina/__generated__/client"
import ClientServicePage from "./client-page"

export default async function ServicePage() {
  const result = await client.queries.service({
    relativePath: "service.md"
  })

  return (
    <ClientServicePage
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  )
}
```

### 3. `app/service/client-page.tsx`

Client component with `useTina` for live editing. Maps block `__typename` values to React components.

**typename mapping** (derived from collection name `service` + template names):

| TinaCMS typename | Component | Exists? |
|---|---|---|
| `ServicePage_blocksPage_banner` | `<PageBanner />` | Yes |
| `ServicePage_blocksService_intro` | `<ServiceIntro />` | **New** |
| `ServicePage_blocksService_options` | `<ServiceOptions />` | **New** |
| `ServicePage_blocksRates_policies` | `<RatesPolicies />` | **New** |
| `ServicePage_blocksCta` | `<CTA />` | Yes |

```tsx
'use client'

import { useTina } from 'tinacms/dist/react'
import { PageBanner } from "@/components/blocks/PageBanner"
import { ServiceIntro } from "@/components/blocks/ServiceIntro"
import { ServiceOptions } from "@/components/blocks/ServiceOptions"
import { RatesPolicies } from "@/components/blocks/RatesPolicies"
import { CTA } from "@/components/blocks/CTA"

export default function ClientServicePage(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const { title, page_blocks } = data.service

  return (
    <main className="min-h-screen">
      {page_blocks?.map((block: any, index: any) => {
        if (!block) return null

        switch (block.__typename) {
          case "ServicePage_blocksPage_banner":
            return <PageBanner key={index} {...block} />
          case "ServicePage_blocksService_intro":
            return <ServiceIntro key={index} {...block} />
          case "ServicePage_blocksService_options":
            return <ServiceOptions key={index} {...block} />
          case "ServicePage_blocksRates_policies":
            return <RatesPolicies key={index} {...block} />
          case "ServicePage_blocksCta":
            return <CTA key={index} {...block} />
          default:
            return null
        }
      })}
    </main>
  )
}
```

### 4. `components/blocks/ServiceIntro.tsx`

Renders the service intro block.

**Props** (from TinaCMS schema):
- `service_intro_title`: string
- `service_intro_text`: rich-text (render with `<TinaMarkdown />`)

```tsx
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
```

### 5. `components/blocks/ServiceOptions.tsx`

Renders two client option cards + a description + a booking link.

**Props** (from TinaCMS schema):
- `new_client`: object `{ title, center_body }` (rich-text body)
- `return_client`: object `{ title, center_body }` (rich-text body)
- `option_desc`: string
- `book_link`: object `{ button_text, button_url }`

```tsx
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
```

### 6. `components/blocks/RatesPolicies.tsx`

Renders a title and a dynamic list of policy items.

**Props** (from TinaCMS schema):
- `policy_title`: string
- `policy_item`: array of `{ title, center_body }` (rich-text body)

```tsx
import { TinaMarkdown } from "tinacms/dist/rich-text"

export function RatesPolicies({
  policy_title,
  policy_item
}: {
  policy_title?: string | null
  policy_item?: Array<{ title?: string | null; center_body?: any } | null> | null
}) {
  return (
    <section className="rates-policies py-16 px-4 max-w-[1080px] m-auto">
      {policy_title && <h2>{policy_title}</h2>}
      {policy_item?.map((item, index) => {
        if (!item) return null
        return (
          <div key={index} className="mt-8">
            {item.title && <h3>{item.title}</h3>}
            <TinaMarkdown content={item.center_body} />
          </div>
        )
      })}
    </section>
  )
}
```

---

## Bug Fix

In `tina/config.ts`, the service collection's router (line 258) incorrectly points to `/about`. Change it to `/service`:

```ts
// Before:
router: ({ document }) => '/about',

// After:
router: ({ document }) => '/service',
```

---

## Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] Visiting `http://localhost:3000/service` renders the page
- [ ] TinaCMS admin at `/admin` shows the Service Page collection
- [ ] All 5 block types can be added and edited in live mode
- [ ] Live edits reflect immediately on the page
