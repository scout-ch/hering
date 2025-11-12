import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchForm from './components/SearchForm'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import './search.less'
import { DocumentTitle } from "../../components/page-title";
import { useTranslation } from "react-i18next";

function SearchPage() {

    const { t } = useTranslation()

    return <>
        <DocumentTitle title={t('searchPage.title')}/>
        <div className='content-main'>
            <div className='search'>
                <h1>
                    <FontAwesomeIcon icon={faSearch}/> {t('searchPage.title')}
                </h1>

                <SearchForm/>
            </div>
        </div>
    </>
}

export default SearchPage