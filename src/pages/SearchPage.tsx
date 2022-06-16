import React from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../helper/MarkdownComponents';
import { withTranslation } from 'react-i18next'
import { IconT } from '../components/Section';
import i18n from '../i18n';
import SearchForm from '../components/SearchForm';

export type SearchPageT = {
    title: string
    menu_name: string
    icon: IconT
    content: string
}

type Props = {
    page: SearchPageT
}

function SearchPage(props: Props) {
    const searchPage = props.page
    const lang = i18n.language

    return <div className='content-main'>
        <Helmet>
            <title>{searchPage.title}</title>
        </Helmet>

        <div className='search'>
            <h1><FontAwesomeIcon icon="search" /> {searchPage.title}</h1>
            <ReactMarkdown
                plugins={[remarkGfm]}
                components={LinkComponent}
            >{searchPage.content}</ReactMarkdown>

            <SearchForm lang={lang}></SearchForm>
        </div>
    </div>
}
export default withTranslation()(SearchPage)