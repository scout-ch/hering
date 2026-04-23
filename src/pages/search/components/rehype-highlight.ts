import type { Element, Root, RootContent, Text } from 'hast'
import { SKIP, visit } from 'unist-util-visit'
import { escapeRegex, normalize } from './search-helper'

/**
 * Creates a rehype plugin that wraps matched search terms in <mark> elements.
 * Operates on the hast (HTML AST) level, splitting text nodes so that matched
 * portions are wrapped in <mark>. Only text nodes are touched, so the surrounding
 * Markdown structure (links, headings, etc.) is preserved.
 */
export const rehypeHighlight = (terms: string[]) => {
    return () => (tree: Root) => {
        if (!terms.length) {
            return
        }

        const searchPattern = new RegExp(terms.map(t => escapeRegex(t)).join('|'), 'gi')

        visit(tree, 'text', (node: Text, index, parent) => {
            if (parent === undefined || index === undefined || !('children' in parent)) {
                return
            }

            // The regex runs against `normalize(node.value)` but slices the original
            // `node.value` using the match offsets. This assumes `normalize` preserves
            // code-point count — true for Latin text (DE/FR/IT), because NFD-stripping
            // only removes combining marks. If the corpus ever includes scripts where
            // case/normalization changes length (e.g. Turkish dotted-I, Greek sigma),
            // we would need an offset map from normalized → original indices.
            const normalizedValue = normalize(node.value)
            const parts: RootContent[] = []
            let lastIndex = 0
            let match: RegExpExecArray | null

            searchPattern.lastIndex = 0
            while ((match = searchPattern.exec(normalizedValue)) !== null) {
                if (match.index > lastIndex) {
                    parts.push({ type: 'text', value: node.value.slice(lastIndex, match.index) })
                }
                const markNode: Element = {
                    type: 'element',
                    tagName: 'mark',
                    properties: {},
                    children: [{
                        type: 'text',
                        value: node.value.slice(match.index, match.index + match[0].length),
                    }],
                }
                parts.push(markNode)
                lastIndex = match.index + match[0].length
            }

            if (parts.length === 0) {
                return
            }

            if (lastIndex < node.value.length) {
                parts.push({ type: 'text', value: node.value.slice(lastIndex) })
            }

            parent.children.splice(index, 1, ...parts)

            // Skip past the newly inserted nodes so the walker does not re-enter
            // the <mark>'s text child (which equals the matched substring and
            // would otherwise be re-wrapped).
            return [SKIP, index + parts.length]
        })
    }
}
