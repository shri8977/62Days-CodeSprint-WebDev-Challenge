import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import php from 'highlight.js/lib/languages/php'
import ruby from 'highlight.js/lib/languages/ruby'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('go', go)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('php', php)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('plaintext', () => ({
  name: 'plaintext',
  contains: [],
}))

const ALIASES = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  csharp: 'csharp',
  'c#': 'csharp',
  'c++': 'cpp',
  sh: 'bash',
  shell: 'bash',
  md: 'markdown',
  yml: 'yaml',
}

export default function CodeBlock({ code, language = 'plaintext', className = '' }) {
  const ref = useRef(null)
  const lang = ALIASES[language] || language || 'plaintext'

  useEffect(() => {
    if (ref.current) {
      delete ref.current.dataset.highlighted
      hljs.highlightElement(ref.current)
    }
  }, [code, lang])

  return (
    <div className={`code-panel ${className}`}>
      <pre>
        <code ref={ref} className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
