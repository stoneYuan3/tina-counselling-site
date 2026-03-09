import { TinaMarkdown } from 'tinacms/dist/rich-text'

export function RichTextArticle({ article_body_field }: any) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
      <TinaMarkdown content={article_body_field} />
    </div>
  )
}