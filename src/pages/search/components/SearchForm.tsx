import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import Loading from '../../../components/loading/Loading';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../../helper/MarkdownComponents';
import SearchInput from './SearchInput';
import { useNavigate, useSearch } from "@tanstack/react-router";
import { loadSections } from "../../../apis/hering-api";
import { useQuery } from "@tanstack/react-query";
import { type SearchResult, preprocessSections, searchChapters } from "./search-helper";

function SearchForm() {

    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const navigate = useNavigate()
    const { keyword: searchKeywordFromUrl } = useSearch({ from: '/search' })

    const isQueryLoaded = useRef<boolean>(false);
    const [keyword, setKeyword] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)

    const timeoutId = useRef<number | undefined>();
    const { data: preprocessedChapters = [], isSuccess: isSectionsLoaded } = useQuery({
        queryKey: ['sections', lang],
        queryFn: async () => await loadSections(lang),
        select: preprocessSections
    })

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

            const searchResults = searchChapters(currentKeyword, preprocessedChapters)

            setSearchResults(searchResults)
            setIsLoadingResults(false)

            timeoutId.current = undefined;
        }, 500)
    }, [preprocessedChapters])

    useEffect(() => {
        if (!isQueryLoaded.current) {
            if (searchKeywordFromUrl) {
                setKeyword(searchKeywordFromUrl)
            }
            isQueryLoaded.current = true;
        }
    }, [searchKeywordFromUrl]);

    useEffect(() => {
        if (keyword.length >= 3) {
            executeSearch(keyword)
        }
    }, [executeSearch]);

    const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const keyword = e.currentTarget?.value ?? ''

        setKeyword(keyword)
        navigate({
            to: '/search',
            search: keyword.length > 0
                ? { keyword }
                : {},
            replace: true,
        })

        executeSearch(keyword)
    }

    const searchResultViews = () => {
        if (!isLoadingResults) {
            if (keyword.length >= 3) {
                if (searchResults.length > 0) {
                    return searchResults.map(result => {
                        return <div key={result.chapterId} className='search-result' onClick={() => navigate({
                            to: '/$sectionId',
                            params: { sectionId: result.sectionId },
                            hash: result.chapterId,
                        })}>
                            <div className={'result-title'}>{result.title}</div>
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
        <SearchInput keyword={keyword} onChange={onChangeKeyword} isDisabled={!isSectionsLoaded}/>
        <br/>
        <Loading isLoading={isLoadingResults}></Loading>
        <div className='search-results'>
            {searchResultViews()}
        </div>
    </>
}

export default SearchForm
