import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import Loading from '../../../components/loading/Loading';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../../helper/MarkdownComponents';
import SearchInput from './SearchInput';
import { Link, useSearchParams } from "react-router-dom";
import { SearchHelper } from "../../../helper/SearchHelper";
import { type  HApiChapter, type HApiSection, loadSections } from "../../../apis/hering-api";
import { useQuery } from "@tanstack/react-query";
import { i18n } from "../../../i18n";

type SearchResult = {
    chapterId: string
    sectionId: string
    title: string
    matchingContents: string[]
}

interface ChapterWithSection {
    sectionId: string;
    chapter: HApiChapter;
    sentences: string[];
}

const markdownLinkRegex = /!?\[(.*?)]\((.*?)\)/gmi
const sentenceRegex = /[^.!?:;#\n]*[^.!?:;#\n\s][^.!?:;#\n]*[.!?]+/g

function SearchForm() {

    const lang = i18n.language
    const { t } = useTranslation()
    const [searchParams, setSearchParams] = useSearchParams();

    const isQueryLoaded = useRef<boolean>(false);
    const [keyword, setKeyword] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)

    const timeoutId = useRef<number | undefined>();
    const sections = useQuery({
        queryKey: ['sections', lang],
        queryFn: async () => await loadSections(lang)
    })

    const preprocessedChapters = useMemo((): ChapterWithSection[] => {
        return (sections.data || []).reduce(
            (chapterInfo: ChapterWithSection[], section: HApiSection) => chapterInfo.concat(
                section.chapters.map(chapter => {
                    const filteredContent = chapter.content.replace(markdownLinkRegex, '')
                    const sentences = filteredContent.match(sentenceRegex) || []
                    return {
                        sectionId: section.documentId,
                        chapter: chapter,
                        sentences: sentences.map(s => s.trim())
                    }
                })
            ),
            []
        )
    }, [sections.data])

    const executeSearch = useCallback((currentKeyword: string) => {
        setIsLoadingResults(true)

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            if (!currentKeyword || currentKeyword.length < 3) {
                setSearchResults([])
                setIsLoadingResults(false)
                return
            }

            const searchResults = preprocessedChapters
                .filter(entry => SearchHelper.matches(currentKeyword, [entry.chapter.title, entry.chapter.content]))
                .map(entry => {
                    return {
                        chapterId: entry.chapter.documentId,
                        sectionId: entry.sectionId,
                        title: entry.chapter.title,
                        matchingContents: findMatchingContents(currentKeyword, entry.sentences),
                    } as SearchResult
                })

            setSearchResults(searchResults)
            setIsLoadingResults(false)

            timeoutId.current = undefined;
        }, 500)
    }, [preprocessedChapters])

    useEffect(() => {
        if (!isQueryLoaded.current) {
            const searchKeyword = searchParams.get('keyword')
            if (searchKeyword) {
                setKeyword(searchKeyword)
                executeSearch(searchKeyword)
            }
        }

        isQueryLoaded.current = true;
    }, [searchParams, executeSearch]);

    const findMatchingContents = (keyword: string, sentences: string[]): string[] => {
        const normalizedKeyword = keyword.toLowerCase()
        return sentences.filter(sentence => sentence.toLowerCase().includes(normalizedKeyword))
    }

    const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const keyword = e.currentTarget?.value ?? ''

        setKeyword(keyword)
        const queryParams = keyword.length > 0
            ? { 'keyword': keyword }
            : undefined;
        setSearchParams(queryParams, { replace: true })

        executeSearch(keyword)
    }

    const searchResultViews = () => {
        if (!isLoadingResults) {
            if (keyword.length >= 3) {
                if (searchResults.length > 0) {
                    return searchResults.map(result => {
                        return <div key={result.chapterId} className='search-result'>
                            <div className='title-match'>
                                <Link to={`/${result.sectionId}#${result.chapterId}`}>{result.title}</Link>
                            </div>
                            {result.matchingContents.length > 0 ?
                                <div className='content-match'>
                                    {result.matchingContents.map((content, idx) => {
                                        return <Markdown key={idx}
                                                         remarkPlugins={[remarkGfm]}
                                                         components={LinkComponent}>{content}</Markdown>
                                    })}
                                </div>
                                : null
                            }
                        </div>
                    })
                }

                return <div>{t('searchPage.noResults')}</div>
            }
            return <div> {t('searchPage.noKeyword', { amountOfCharacters: 3 })}</div>
        }
        return null
    }

    return <>
        <SearchInput keyword={keyword} onChange={onChangeKeyword} isDisabled={!sections.isSuccess}/>
        <br/>
        <Loading isLoading={isLoadingResults}></Loading>
        <div className='search-results'>
            {searchResultViews()}
        </div>
    </>
}

export default SearchForm