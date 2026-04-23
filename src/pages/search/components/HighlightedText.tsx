import type { ReactNode } from 'react'
import { escapeRegex, normalize } from './search-helper'

type Props = {
    text: string
    terms: string[]
}

/**
 * Renders a plain string with matched search terms wrapped in <mark>.
 * Matches are found against the diacritic-stripped, lowercased form of the text,
 * but the original text is sliced for display. Same Latin-only assumption as
 * rehype-highlight.ts (NFD-stripping preserves code-point count for DE/FR/IT).
 */
function HighlightedText({ text, terms }: Props) {
    if (!terms.length) {
        return <>{text}</>
    }

    const pattern = new RegExp(terms.map(escapeRegex).join('|'), 'gi')
    const normalized = normalize(text)
    const nodes: ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    let key = 0

    while ((match = pattern.exec(normalized)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index))
        }
        nodes.push(
            <mark key={key++}>
                {text.slice(match.index, match.index + match[0].length)}
            </mark>
        )
        lastIndex = match.index + match[0].length
    }

    if (nodes.length === 0) {
        return <>{text}</>
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex))
    }

    return <>{nodes}</>
}

export default HighlightedText
