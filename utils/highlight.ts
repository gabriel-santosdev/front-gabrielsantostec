const KEYWORDS =
  /\b(class|extends|public|function|return|new|const|await|async|ref|method|body|import|from|type|export|if|else)\b/

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Realce de sintaxe simples para trechos de código estáticos do site.
 * Só use com conteúdo controlado (nunca com texto digitado pelo visitante):
 * o resultado é renderizado com v-html.
 */
export function highlight(code: string): string {
  const pattern = new RegExp(
    `(\\/\\/[^\\n]*)|('[^']*'|"[^"]*"|\`[^\`]*\`)|${KEYWORDS.source}|(<\\/?[\\w-]+)|(\\$\\w+)|(\\b\\w+(?=\\())`,
    'g'
  )
  let html = ''
  let last = 0
  for (const match of code.matchAll(pattern)) {
    html += escapeHtml(code.slice(last, match.index))
    const [token, comment, str, keyword, tag, variable, fn] = match
    let cls = ''
    if (comment) cls = 'tk-comment'
    else if (str) cls = 'tk-str'
    else if (keyword) cls = 'tk-key'
    else if (tag) cls = 'tk-tag'
    else if (variable) cls = 'tk-var'
    else if (fn) cls = 'tk-fn'
    html += `<span class="${cls}">${escapeHtml(token)}</span>`
    last = (match.index ?? 0) + token.length
  }
  return html + escapeHtml(code.slice(last))
}
