import { type HApiChapter, type HApiSection } from "../../../apis/hering-api";

export type SearchResult = {
    chapterId: string
    sectionId: string
    title: string
    matchingContents: string[]
}

export interface ChapterWithSection {
    sectionId: string;
    chapter: HApiChapter;
    paragraphs: Paragraph[];
    normalizedTitle: string;
}

interface Paragraph {
    original: string;
    plainText: string;
}

const markdownLinkRegex = /!?\[(.*?)]\((.*?)\)/gmi

/**
 * Normalizes a string for diacritic-insensitive and case-insensitive comparison.
 * Uses Unicode NFD decomposition to separate base characters from combining accents,
 * then strips the accents. This ensures e.g. "équipe" matches a search for "equipe".
 */
const normalize = (value: string): string => {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Splits Markdown content into paragraphs (by double newlines) and produces both the
 * original text (with Markdown links intact for rendering) and a plain-text version
 * (links replaced by their display text, normalized) for search matching.
 */
const extractParagraphs = (content: string): Paragraph[] => {
    return content
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0)
        .map(p => ({
            original: p,
            plainText: normalize(p.replace(markdownLinkRegex, '$1')),
        }))
}

/**
 * Flattens sections into a list of chapters enriched with pre-extracted paragraphs
 * and normalized titles. Intended to be executed sparingly as pre-processing the paragraphs
 * can be expensive.
 */
export const preprocessSections = (sections: HApiSection[]): ChapterWithSection[] => {
    return sections.reduce(
        (chapterInfo: ChapterWithSection[], section: HApiSection) => chapterInfo.concat(
            section.chapters.map(chapter => ({
                sectionId: section.documentId,
                chapter: chapter,
                paragraphs: extractParagraphs(chapter.content),
                normalizedTitle: normalize(chapter.title),
            }))
        ),
        []
    )
}

/**
 * Searches preprocessed chapters for a keyword string. The keyword is split into
 * space-separated terms; a chapter matches if any term appears in its title or in
 * any of its paragraphs. Matching paragraphs are returned with their original
 * Markdown content preserved so they can be rendered with links intact.
 */
export const searchChapters = (keyword: string, chapters: ChapterWithSection[]): SearchResult[] => {
    const normalizedTerms = keyword
        .split(' ')
        .filter(t => t.length > 0)
        .map(t => normalize(t))

    const results: SearchResult[] = []
    for (const entry of chapters) {
        const matchingParagraphs = entry.paragraphs.filter(p =>
            normalizedTerms.some(term => p.plainText.includes(term))
        )
        const titleMatches = normalizedTerms.some(term => entry.normalizedTitle.includes(term))

        if (matchingParagraphs.length > 0 || titleMatches) {
            results.push({
                chapterId: entry.chapter.documentId,
                sectionId: entry.sectionId,
                title: entry.chapter.title,
                matchingContents: matchingParagraphs.map(p => p.original),
            })
        }
    }

    return results
}
