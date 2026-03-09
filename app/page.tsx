import client from "@/tina/__generated__/client"
import ClientPage from "./client-page"

export default async function HomePage() {
  const result = await client.queries.home({
    relativePath: "home.md"
  })

  return (
    <ClientPage 
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  )
}