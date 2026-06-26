import { cssToReactCode } from './cssToReact.js'

// ─── CSS → Tailwind config snippet ───────────────────────────────────────────
// We can't do full CSS-to-Tailwind class conversion (requires build pipeline),
// but we CAN generate a tailwind.config.js `theme.extend` snippet for
// design-token-like properties (colors, border-radius, box-shadow, spacing, etc.)

const TAILWIND_PROP_MAP = {
  background: null,            // too complex to map
  'background-color': (v, n) => ({ key: `colors.${n}`, value: v }),
  color: (v, n) => ({ key: `colors.${n}-text`, value: v }),
  'border-radius': (v, n) => ({ key: `borderRadius.${n}`, value: v }),
  'box-shadow': (v, n) => ({ key: `boxShadow.${n}`, value: v }),
  'font-size': (v, n) => ({ key: `fontSize.${n}`, value: v }),
  'letter-spacing': (v, n) => ({ key: `letterSpacing.${n}`, value: v }),
  padding: (v, n) => ({ key: `spacing.${n}`, value: v }),
  gap: (v, n) => ({ key: `spacing.${n}-gap`, value: v }),
  'backdrop-filter': (v, n) => ({ key: `backdropBlur.${n}`, value: v }),
  filter: (v, n) => ({ key: `dropShadow.${n}`, value: v }),
}

function parseCssPairs(css) {
  const pairs = []
  const lines = css.split('\n')
  for (const raw of lines) {
    const line = raw.trim()
    const m = line.match(/^([\w-]+)\s*:\s*(.+?);?\s*$/)
    if (m && !m[1].startsWith('--')) {
      pairs.push({ prop: m[1], value: m[2] })
    }
  }
  return pairs
}

export function cssToTailwindConfig(css, name = 'custom') {
  const pairs = parseCssPairs(css)
  if (!pairs.length) {
    return `// No directly mappable properties found.\n// Consider adding these values to your tailwind.config.js theme.extend manually.`
  }

  const extensions = {}

  for (const { prop, value } of pairs) {
    const mapper = TAILWIND_PROP_MAP[prop]
    if (mapper === null) continue
    if (!mapper) continue
    const result = mapper(value, name)
    if (result) {
      // Convert dotted key to nested object
      const parts = result.key.split('.')
      let target = extensions
      for (let i = 0; i < parts.length - 1; i++) {
        if (!target[parts[i]]) target[parts[i]] = {}
        target = target[parts[i]]
      }
      target[parts[parts.length - 1]] = result.value
    }
  }

  const stringify = (obj, indent = 2) => {
    const sp = ' '.repeat(indent)
    const lines = Object.entries(obj).map(([k, v]) => {
      if (typeof v === 'object') {
        return `${sp}${k}: ${stringify(v, indent + 2)},`
      }
      return `${sp}${k}: '${v}',`
    })
    return `{\n${lines.join('\n')}\n${' '.repeat(indent - 2)}}`
  }

  if (!Object.keys(extensions).length) {
    return `// No directly mappable Tailwind config entries found for this CSS.\n// Tip: colors, border-radius, box-shadow, and font-size map best.\n\n// Add to tailwind.config.js:\n// theme: { extend: {} }`
  }

  return `// Add to tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: ${stringify(extensions)},\n  },\n}`
}

// ─── CSS → SCSS variables ─────────────────────────────────────────────────────
function kebabToScssVar(prop) {
  return `$${prop}`
}

export function cssToScss(css, name = 'component') {
  const pairs = parseCssPairs(css)

  // Check if it's already a :root variable block
  if (css.includes(':root') || css.includes('--')) {
    const varLines = css.split('\n').filter((l) => l.trim().startsWith('--'))
    if (varLines.length) {
      const scssVars = varLines
        .map((l) => {
          const m = l.trim().match(/^--([a-zA-Z0-9-]+)\s*:\s*(.+?);?\s*$/)
          return m ? `$${m[1]}: ${m[2]};` : ''
        })
        .filter(Boolean)
      return `// SCSS Variables (converted from CSS custom properties)\n${scssVars.join('\n')}`
    }
  }

  if (!pairs.length) return '// No convertible declarations found.'

  const scssVars = pairs
    .map(({ prop, value }) => `${kebabToScssVar(prop)}: ${value};`)
    .join('\n')

  const scssRule = `.${name} {\n${pairs.map(({ prop, value }) => `  ${prop}: ${kebabToScssVar(prop)};`).join('\n')}\n}`

  return `// SCSS Variables\n${scssVars}\n\n// Usage\n${scssRule}`
}

// ─── Combined format switcher ─────────────────────────────────────────────────
export const FORMATS = ['CSS', 'React', 'Tailwind', 'SCSS']

export function formatCode(css, format, name = 'custom') {
  switch (format) {
    case 'CSS': return css
    case 'React': return cssToReactCode(css)
    case 'Tailwind': return cssToTailwindConfig(css, name)
    case 'SCSS': return cssToScss(css, name)
    default: return css
  }
}