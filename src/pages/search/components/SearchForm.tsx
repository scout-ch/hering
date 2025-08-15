import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import Loading from '../../../components/loading/Loading';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../../helper/MarkdownComponents';
import SearchInput from './SearchInput';
import { Link, useSearchParams } from "react-router-dom";
import { SearchHelper } from "../../../helper/SearchHelper";
import { HApiChapter, HApiSection } from "../../../apis/hering-api";

type Props = {
    sections: HApiSection[]
}

type SearchResult = {
    chapterId: string
    sectionId: string
    title: string
    matchingContents: string[]
}

interface ChapterWithSection {
    sectionId: string;
    chapter: HApiChapter
}

function SearchForm(props: Props) {

    const { t } = useTranslation()
    const [searchParams, setSearchParams] = useSearchParams();

    const isQueryLoaded = useRef<boolean>(false);
    const [keyword, setKeyword] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)

    const timeoutId = useRef<number | undefined>();
    const searchableSections = useRef<HApiSection[]>(props.sections)

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

            const searchResults = searchableSections.current
                .reduce((chapterInfo: ChapterWithSection[], section: HApiSection) => chapterInfo.concat(
                    section.chapters.map(chapter => ({
                        sectionId: section.documentId,
                        chapter: chapter
                    }))
                ), [])
                .filter(entry => SearchHelper.matches(currentKeyword, [entry.chapter.title, entry.chapter.content]))
                .map(entry => {
                    return {
                        chapterId: entry.chapter.documentId,
                        sectionId: entry.sectionId,
                        title: entry.chapter.title,
                        matchingContents: findMatchingContents(currentKeyword, entry.chapter.content),
                    } as SearchResult
                })

            setSearchResults(searchResults)
            setIsLoadingResults(false)

            timeoutId.current = undefined;
        }, 500)
    }, [])

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

    const findMatchingContents = (keyword: string, content: string): string[] => {
        const markdownLinkRegex = new RegExp('!?\\[(.*?)]\\((.*?)\\)', 'gmi')
        const keywordRegex = new RegExp(`[^.!?:;#\n]*(?=${keyword}).*?[.!?](?=\s?|\p{Lu}|$)`, 'gmi')

        const filteredContent = content.replace(markdownLinkRegex, '') // Remove Markdown links from search results
        const matches = Array.from(filteredContent.matchAll(keywordRegex))

        return matches.reduce(
            (searchResults: string[], currentMatches: RegExpMatchArray) => searchResults.concat(currentMatches),
            []
        )
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
        <SearchInput keyword={keyword} onChange={onChangeKeyword}/>
        <br/>
        <Loading isLoading={isLoadingResults}></Loading>
        <div className='search-results'>
            {searchResultViews()}
        </div>
    </>
}

export default SearchForm