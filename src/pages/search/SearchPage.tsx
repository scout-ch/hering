import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {LinkComponent} from '../../helper/MarkdownComponents'
import i18n from '../../i18n'
import SearchForm from './components/SearchForm'
import searchPageDE from "../../data/search-page/de.json"
import searchPageFR from "../../data/search-page/fr.json"
import searchPageIT from "../../data/search-page/it.json"
import {SectionT} from "../section/components/Section"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import './search.less'

type Props = {
    sections: SectionT[]
}

export type SearchPageT = {
    title: string
    content: string
}

function SearchPage(props: Props) {

    const lang = i18n.language
    const [searchPage, setSearchPage] = useState<SearchPageT>();

    useEffect(() => {
        document.title = searchPage?.title ?? '';
    }, [searchPage]);

    useEffect(() => {
        switch (i18n.language) {
            case 'de':
                return setSearchPage(searchPageDE)
            case 'fr':
                return setSearchPage(searchPageFR)
            case 'it':
                return setSearchPage(searchPageIT)
            default:
                return setSearchPage(searchPageDE)
        }
    }, [lang])

    useEffect(() => {
        document.title = searchPage?.title ?? '';
    }, [searchPage])

    if (!searchPage) {
        return null
    }

    return <div className='content-main'>
        <div className='search'>
            <h1>
                <FontAwesomeIcon icon={faSearch}/> {searchPage.title}
            </h1>
            <Markdown remarkPlugins={[remarkGfm]}
                      components={LinkComponent}>
                {searchPage.content}
            </Markdown>

            <SearchForm sections={props.sections}/>
        </div>
    </div>
}

export default SearchPage