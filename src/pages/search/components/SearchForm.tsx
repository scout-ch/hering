import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next"
import Loading from '../../../components/loading/Loading';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../../../helper/MarkdownComponents';
import { rehypeHighlight } from './rehype-highlight';
import HighlightedText from './HighlightedText';
import SearchInput from './SearchInput';
import { useNavigate, useSearch } from "@tanstack/react-router";
import { loadSections } from "../../../apis/hering-api";
import { useQuery } from "@tanstack/react-query";
import { buildSearchIndex, searchChapters, type SearchResult } from "./search-helper";

function SearchForm() {

    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const navigate = useNavigate()
    const { keyword: searchKeywordFromUrl } = useSearch({ from: '/search' })

    const [keyword, setKeyword] = useState<string>(searchKeywordFromUrl ?? '')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isSearchPending, setIsSearchPending] = useState<boolean>(false)

    const timeoutId = useRef<number | undefined>(undefined);
    const { data: searchIndex, isLoading: isIndexLoading, isSuccess: isSectionsLoaded } = useQuery({
        queryKey: ['sections', lang],
        queryFn: async () => await loadSections(lang),
        select: buildSearchIndex
    })

    const executeSearch = useCallback((currentKeyword: string) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        if (!currentKeyword || currentKeyword.length < 3 || !searchIndex) {
            setSearchResults([])
            setIsSearchPending(false)
            return
        }

        setIsSearchPending(true)
        timeoutId.current = window.setTimeout(() => {
            setSearchResults(searchChapters(currentKeyword, searchIndex))
            setIsSearchPending(false)
            timeoutId.current = undefined;
        }, 500)
    }, [searchIndex])

    // Keep state in sync with the URL so browser back/forward restores the keyword.
    useEffect(() => {
        setKeyword(searchKeywordFromUrl ?? '')
    }, [searchKeywordFromUrl]);

    // Re-run the search whenever the keyword or the loaded index changes.
    useEffect(() => {
        executeSearch(keyword)
    }, [executeSearch, keyword]);

    const onChangeKeyword = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
        e.preventDefault();
        const keyword = e.currentTarget?.value ?? ''

        setKeyword(keyword)
        await navigate({
            to: '/search',
            search: keyword.length > 0
                ? { keyword }
                : {},
            replace: true,
        })
    }

    async function handleSearchResultClick(result: SearchResult, event: React.MouseEvent<HTMLDivElement>): Promise<void> {
        // Skip card navigation when the click originated on a link inside the rendered markdown,
        // so the link's own navigation (e.g. opening an external URL in a new tab) is the only thing that happens.
        if ((event.target as HTMLElement).closest('a')) {
            return
        }

        // Skip navigation when the click ends a text selection inside this card,
        // otherwise releasing the cursor after highlighting text would trigger a navigation.
        const selection = window.getSelection()
        if (selection && !selection.isCollapsed && event.currentTarget.contains(selection.anchorNode)) {
            return
        }

        await navigate({
            to: '/$sectionId',
            params: { sectionId: result.sectionId },
            hash: result.chapterId,
        })
    }

    const searchResultViews = () => {
        if (isIndexLoading) {
            return null
        }

        if (keyword.length >= 3) {
            if (searchResults.length === 0 && isSearchPending) {
                return null
            }

            if (searchResults.length > 0) {
                return searchResults.map(result => {
                    return <div key={result.chapterId} className='search-result' onClick={e => handleSearchResultClick(result, e)}>
                        <div className={'result-title'}>
                            <HighlightedText text={result.title} terms={result.matchedTerms}/>
                        </div>
                        {result.matchingContents.length > 0 ?
                            <div className='content-match'>
                                {result.matchingContents.map((content, idx) => {
                                    return <Markdown key={idx}
                                                     remarkPlugins={[remarkGfm]}
                                                     rehypePlugins={[rehypeHighlight(result.matchedTerms)]}
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

    return <>
        <SearchInput keyword={keyword} onChange={onChangeKeyword} isDisabled={!isSectionsLoaded}/>
        <br/>
        <Loading isLoading={isIndexLoading || isSearchPending}></Loading>
        <div className='search-results'>
            {searchResultViews()}
        </div>
    </>
}

export default SearchForm
