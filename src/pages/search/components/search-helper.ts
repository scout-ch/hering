import { Document } from 'flexsearch';
import { type HApiSection } from "../../../apis/hering-api";

export type SearchResult = {
    chapterId: string
    sectionId: string
    title: string
    matchingContents: string[]
    matchedTerms: string[]
}

interface Paragraph {
    original: string;
    plainText: string;
}

interface IndexedChapter {
    id: string;
    sectionId: string;
    title: string;
    paragraphs: Paragraph[];
}

type ChapterDocument = {
    id: string;
    title: string;
    content: string;
}

/**
 * Normalizes a string for diacritic-insensitive and case-insensitive comparison.
 * Uses Unicode NFD decomposition to separate base characters from combining accents,
 * then strips the accents. This ensures e.g. "équipe" matches a search for "equipe".
 */
export const normalize = (value: string): string => {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Escapes regex metacharacters in a string so it can be interpolated into a
 * RegExp and matched literally. Without this, characters like ".", "(", or "*"
 * would be interpreted by the engine — a query of "..." would match any three
 * characters, and an unbalanced "(" would throw SyntaxError.
 */
export const escapeRegex = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Splits Markdown content into paragraphs (by double newlines) and produces both the
 * original text (with Markdown links intact for rendering) and a plain-text version
 * (links replaced by their display text, normalized) for search matching.
 */
const extractParagraphs = (content: string): Paragraph[] => {
    const markdownLinkRegex = /!?\[(.*?)]\((.*?)\)/gmi

    return content
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0)
        .map(p => ({
            original: p,
            plainText: normalize(p.replace(markdownLinkRegex, '$1')),
        }))
}

export interface SearchIndex {
    flexSearch: Document<ChapterDocument>;
    chapters: Map<string, IndexedChapter>;
}

/**
 * Builds a FlexSearch Document index from sections. Flattens all chapters into
 * searchable documents with title and content fields. Uses the "full" tokenizer,
 * which indexes every substring of every token so that queries can match
 * mid-word. This is necessary for German compound words where users search for
 * e.g. "dossier" and expect to hit "Lagerdossier". The "Normalize" encoder
 * handles diacritic-insensitive search across DE/FR/IT content.
 */
export const buildSearchIndex = (sections: HApiSection[]): SearchIndex => {
    const chapters = new Map<string, IndexedChapter>()

    const flexSearch = new Document<ChapterDocument>({
        tokenize: "full",
        encoder: "Normalize",
        document: {
            id: "id",
            index: ["title", "content"],
        },
    })

    for (const section of sections) {
        for (const chapter of section.chapters) {
            const paragraphs = extractParagraphs(chapter.content)
            chapters.set(chapter.documentId, {
                id: chapter.documentId,
                sectionId: section.documentId,
                title: chapter.title,
                paragraphs,
            })

            flexSearch.add({
                id: chapter.documentId,
                title: chapter.title,
                content: paragraphs.map(p => p.plainText).join(' '),
            })
        }
    }

    return { flexSearch, chapters }
}

/**
 * Searches the FlexSearch index for a keyword string. Results are deduplicated
 * across fields (title and content). For each matching chapter, paragraphs
 * containing any of the search terms are returned with their original Markdown
 * content preserved for rendering.
 */
export const searchChapters = (keyword: string, index: SearchIndex): SearchResult[] => {
    const hits = index.flexSearch.search(keyword, { merge: true, suggest: true })

    const normalizedTerms = keyword
        .split(/\s+/)
        .filter(t => t.length > 0)
        .map(t => normalize(t))

    return hits.flatMap(hit => {
        const chapter = index.chapters.get(hit.id as string)
        if (!chapter) {
            return []
        }

        const matchingParagraphs = chapter.paragraphs.filter(p =>
            normalizedTerms.some(term => p.plainText.includes(term))
        )

        // Title-only hits have no matching paragraphs — fall back to the first
        // paragraph so the result card shows an excerpt instead of a bare title.
        const matchingContents = matchingParagraphs.length > 0
            ? matchingParagraphs.map(p => p.original)
            : chapter.paragraphs.length > 0
                ? [chapter.paragraphs[0].original]
                : []

        return [{
            chapterId: chapter.id,
            sectionId: chapter.sectionId,
            title: chapter.title,
            matchingContents,
            matchedTerms: normalizedTerms,
        }]
    })
}
