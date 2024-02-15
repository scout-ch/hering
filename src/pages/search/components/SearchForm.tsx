import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useTranslation} from "react-i18next"
import Loading from '../../../components/Loading'
import {ChapterT} from '../../section/components/Chapter';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {LinkComponent} from '../../../helper/MarkdownComponents';
import SearchInput from './SearchInput';
import {Link, useSearchParams} from "react-router-dom";
import {SectionT} from "../../section/components/Section";
import {SearchHelper} from "../../../helper/SearchHelper";

type Props = {
    sections: SectionT[]
}

type SearchResult = {
    id: number
    title: string
    matchingContents: string[]
    slug: string
}

function SearchForm(props: Props) {

    const {t} = useTranslation()
    const [searchParams, setSearchParams] = useSearchParams();

    const isQueryLoaded = useRef<boolean>(false);
    const [keyword, setKeyword] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)

    const timeoutId = useRef<NodeJS.Timeout | undefined>();
    const searchableSectionChapters = useRef<ChapterT[]>(props.sections
        .reduce((chapters: ChapterT[], currentSection: SectionT) => chapters.concat(currentSection.chapters), []))

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

            const searchResults = searchableSectionChapters.current
                .filter(chapter => SearchHelper.matches(currentKeyword, [chapter.title, chapter.content]))
                .map(chapter => {
                    return {
                        id: chapter.id,
                        title: chapter.title,
                        matchingContents: findMatchingContents(currentKeyword, chapter.content),
                        slug: chapter.slug_with_section
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
        // eslint-disable-next-line
        const keywordRegex = new RegExp(`[^.!?:;#\n]*(?=${keyword}).*?[.!?](?=\s?|\p{Lu}|$)`, 'gmi')

        const filteredContent = content.replace(markdownLinkRegex, '') // Remove Markdown links from search results
        const matches = Array.from(filteredContent.matchAll(keywordRegex))

        return matches.reduce((searchResults: string[], currentMatches: RegExpMatchArray) => searchResults.concat(currentMatches),
            [])
    }

    const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const keyword = e.currentTarget?.value ?? ''

        setKeyword(keyword)
        const queryParams = keyword.length > 0
            ? {'keyword': keyword}
            : undefined;
        setSearchParams(queryParams, {replace: true})

        executeSearch(keyword)
    }

    const searchResultViews = () => {
        if (!isLoadingResults) {
            if (keyword.length >= 3) {
                if (searchResults.length > 0) {
                    return searchResults.map(result => {
                        return <div key={result.id} className='search-result'>
                            <div className='title-match'>
                                <Link to={'/' + result.slug}>{result.title}</Link>
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
            return <div> {t('searchPage.noKeyword', {amountOfCharacters: 3})}</div>
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