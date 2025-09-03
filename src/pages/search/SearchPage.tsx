import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from '../../helper/MarkdownComponents'
import { i18n } from '../../i18n'
import SearchForm from './components/SearchForm'
import searchPageDE from "../../data/search-page/de.json"
import searchPageFR from "../../data/search-page/fr.json"
import searchPageIT from "../../data/search-page/it.json"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import './search.less'
import { type HApiSection } from "../../apis/hering-api";
import { DocumentTitle } from "../../components/page-title";

type Props = {
    sections: HApiSection[]
}

export type SearchPageT = {
    title: string
    content: string
}

function SearchPage(props: Props) {

    const lang = i18n.language
    const [searchPage, setSearchPage] = useState<SearchPageT>();

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

    if (!searchPage) {
        return null
    }

    return <>
        <DocumentTitle title={searchPage.title}/>
        <div className='content-main'>
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
    </>
}

export default SearchPage