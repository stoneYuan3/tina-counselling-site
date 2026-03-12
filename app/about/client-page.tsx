'use client'

import { useTina } from 'tinacms/dist/react'
import { PageBanner } from "@/components/blocks/PageBanner"
import { RichTextArticle } from "@/components/blocks/RichTextArticle"
import { CTA } from "@/components/blocks/CTA"

export default function ClientAboutPage(props:any) {
  // useTina enables live editing
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const { title, page_blocks } = data.about

  return (
    <main className="min-h-screen">
      {page_blocks?.map((block:any, index:any) => {
        if (!block) return null

        switch (block.__typename) {
          case "AboutPage_blocksPage_banner":
            return <PageBanner key={index} {...block} />

          case "AboutPage_blocksArticle_body":
            return <RichTextArticle key={index} {...block} />

          case "AboutPage_blocksCta":
            return <CTA key={index} {...block} />

          default:
            return null
        }
      })}
    </main>
  )
}