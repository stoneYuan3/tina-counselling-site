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
