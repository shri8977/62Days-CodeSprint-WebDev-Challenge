import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownPreview({ content }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || '_Nothing to preview yet…_'}
      </ReactMarkdown>
    </div>
  )
}
