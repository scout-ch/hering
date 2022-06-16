import React, { useEffect, useMemo, useState } from 'react'
import { withTranslation } from "react-i18next"
import Loading from './Loading'
import { getLocalSectionData } from '../helper/LocalDataHelper';
import { SearchHelper } from '../helper/SearchHelper';
import { useHistory, useLocation } from 'react-router';
import { ChapterT } from '../components/Chapter';
import { SectionT } from '../components/Section';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../helper/MarkdownComponents';
import SearchInput from './SearchInput';

type Props = {
    t: any,
    lang: string
}

type SearchResult = {
    id: number
    title: string
    matchingContents: string[]
    slug: string
}

function SearchForm(props: Props) {
    const location = useLocation()
    const history = useHistory()
    const { t, lang } = props;

    const [keyword, setKeyword] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)

    const searchableSectionChapters = useMemo<ChapterT[]>(() => getLocalSectionData(lang).reduce((chapters: ChapterT[], currentSection: SectionT) => chapters.concat(currentSection.chapters), []), [lang])

    useEffect(() => {
        const routeParams = new URLSearchParams(location.search)
        const keywordFromRoute = routeParams.get('keyword')
        if (keywordFromRoute) {
            setKeyword(keywordFromRoute)
        }
    }, [location.search])

    useEffect(() => {
        const buildSearchResults = () => {
            setIsLoadingResults(true)
            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            if (!keyword || keyword.length <= 2) {
                setSearchResults([])
                setIsLoadingResults(false)
                history.replace({ search: '' })
                return
            }

            setTimeoutId(setTimeout(() => {
                const searchResults = searchableSectionChapters
                    .filter(chapter => SearchHelper.matches(keyword, [chapter.title, chapter.content]))
                    .map(chapter => {
                        return {
                            id: chapter.id,
                            title: chapter.title,
                            matchingContents: findMatchingContents(keyword, chapter.content),
                            slug: chapter.slug_with_section
                        } as SearchResult
                    })
                setSearchResults(searchResults)
                setIsLoadingResults(false)

                const routeParams = new URLSearchParams(location.search)
                if (routeParams.get('keyword') !== keyword) {
                    routeParams.set('keyword', keyword)
                    history.replace({ search: routeParams.toString() })
                }
            }, 500))
        }
        buildSearchResults()
    }, [keyword, searchableSectionChapters])  // eslint-disable-line react-hooks/exhaustive-deps

    const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>): void => {
        setKeyword(e.currentTarget?.value ?? '')
    }

    const findMatchingContents = (keyword: string, content: string): string[] => {
        const matches = Array.from(content.matchAll(new RegExp(`[^.!?:;#\n]*(?=${keyword}).*?[.!?](?=\s?|\p{Lu}|$)`, 'gmi'))) // eslint-disable-line no-useless-escape
        return matches.reduce((searchResults: string[], currentMatches: RegExpMatchArray) => searchResults.concat(currentMatches), [])
    }

    const searchResultViews = () => {
        if (!isLoadingResults) {
            if (keyword.length > 0) {
                if (searchResults.length > 0) {
                    return searchResults.map(result => {
                        return <div key={result.id} className='search-result'>
                            <div className='title-match'>
                                <a href={history.createHref({ pathname: result.slug })}>{result.title}</a>
                            </div>
                            {result.matchingContents.length > 0 ?
                                <div className='content-match'>
                                    {result.matchingContents.map((content, idx) => {
                                        return <ReactMarkdown key={idx} remarkPlugins={[remarkGfm]} components={LinkComponent}>{content}</ReactMarkdown>
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
        <SearchInput keyword={keyword} onChange={onChangeKeyword} />
        <br />
        <Loading isLoading={isLoadingResults}></Loading>
        <div className='search-results'>
            {searchResultViews()}
        </div>
    </>
}
export default withTranslation()(SearchForm)