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
