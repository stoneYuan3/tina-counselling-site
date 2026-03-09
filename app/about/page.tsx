import client from "@/tina/__generated__/client"
import ClientAboutPage from "./client-page"

export default async function AboutPage() {
  const result = await client.queries.about({
    relativePath: "about.md"
  })

  return (
    <ClientAboutPage 
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  )
}