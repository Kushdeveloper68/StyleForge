// Convert kebab-case CSS property to camelCase for React style objects
function toCamel(prop) {
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

// Parse CSS text into declaration groups, handling multi-line values
export function parseCssDeclarations(css) {
  const groups = []
  let current = { selector: null, declarations: [] }
  let depth = 0
  let pending = null

  const rawLines = css.split('\n')
  const lines = []

  for (const raw of rawLines) {
    const line = raw.trim()
    if (!line) continue

    const looksLikeNewStatement =
      line.startsWith('/*') ||
      line.startsWith('@') ||
      line.endsWith('{') ||
      line === '}' ||
      /^-{0,2}[a-zA-Z][a-zA-Z0-9-]*\s*:/.test(line)

    if (pending !== null && !looksLikeNewStatement) {
      pending += ' ' + line
      if (pending.endsWith(';')) { lines.push(pending); pending = null }
      continue
    }
    if (pending !== null) { lines.push(pending); pending = null }

    if (/^-{0,2}[a-zA-Z][a-zA-Z0-9-]*\s*:/.test(line) && !line.endsWith(';') && !line.endsWith('{')) {
      pending = line
      continue
    }
    lines.push(line)
  }
  if (pending !== null) lines.push(pending)

  for (const line of lines) {
    if (!line) continue
    if (line.startsWith('/*') || line.startsWith('@')) continue

    if (line.endsWith('{')) {
      if (depth === 0 && current.declarations.length) groups.push(current)
      current = { selector: line.slice(0, -1).trim(), declarations: [] }
      depth++
      continue
    }
    if (line === '}') {
      depth = Math.max(0, depth - 1)
      if (depth === 0) { groups.push(current); current = { selector: null, declarations: [] } }
      continue
    }

    const match = line.match(/^(-?[a-zA-Z-]+)\s*:\s*(.+?);?\s*$/)
    if (match && !match[1].startsWith('--')) {
      current.declarations.push({ prop: match[1].trim(), value: match[2].trim() })
    }
  }
  if (current.declarations.length) groups.push(current)
  return groups
}

// Convert CSS text to a React style object string
export function cssToReactStyle(css) {
  const groups = parseCssDeclarations(css)
  if (!groups.length) return '{}'
  const declarations = groups[0].declarations
  if (!declarations.length) return '{}'

  const lines = declarations.map(({ prop, value }) => {
    const camelProp = toCamel(prop)
    const isPureNumber = /^-?\d+(\.\d+)?$/.test(value)
    const jsValue = isPureNumber ? value : `'${value.replace(/'/g, "\\'")}'`
    return `  ${camelProp}: ${jsValue},`
  })
  return `{\n${lines.join('\n')}\n}`
}

// Convert CSS text to a full React code snippet
export function cssToReactCode(css) {
  const style = cssToReactStyle(css)
  if (style === '{}') {
    return '// This output uses CSS custom properties or complex syntax\n// that cannot be directly converted to a React inline style object.\n// Use the CSS tab and apply via a stylesheet or className instead.'
  }
  return `const style = ${style}\n\n<div style={style} />`
}