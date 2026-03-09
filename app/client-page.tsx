'use client'

import { useTina } from 'tinacms/dist/react'
import { Banner } from "@/components/blocks/Banner"
import { FeaturedQuote } from "@/components/blocks/FeaturedQuote"
import { TwoColumnParagraph } from "@/components/blocks/TwoColumnParagraph"
import { CTA } from "@/components/blocks/CTA"

export default function ClientPage(props:any) {
  // useTina will enable live editing
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const { title, page_blocks } = data.home

  return (
    <main className="min-h-screen">
      {page_blocks?.map((block:any, index:any) => {
        if (!block) return null

        switch (block.__typename) {
          case "HomePage_blocksBanner_home":
            return <Banner key={index} {...block} />
          case "HomePage_blocksFeatured_quote":
            return <FeaturedQuote key={index} {...block} />
          case "HomePage_blocksTwocol_paragraph":
            return <TwoColumnParagraph key={index} {...block} />
          case "HomePage_blocksCta":
            return <CTA key={index} {...block} />
          default:
            return null
        }
      })}
    </main>
  )
}