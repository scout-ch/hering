import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchForm from './components/SearchForm'
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

function SearchPage() {

    const { t } = useTranslation()

    return <>
        <DocumentTitle title={t('searchPage.title')}/>
        <div className='content-main'>
            <div className='search'>
                <h1>
                    <FontAwesomeIcon icon={faSearch}/> {t('searchPage.title')}
                </h1>

                <SearchForm sections={props.sections}/>
            </div>
        </div>
    </>
}

export default SearchPage