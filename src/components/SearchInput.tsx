import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useTranslation} from "react-i18next"

type Props = {
    keyword?: string,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function SearchInput(props: Props) {

    const {t} = useTranslation()
    const {keyword, onChange, onKeyDown} = props

    return <div className='search-input'>
        <div className='icon-input'>
            <div className='icon'>
                <FontAwesomeIcon icon="search"/>
            </div>
            <input type='text'
                   name='search'
                   className='search'
                   placeholder={t('searchPage.searchPlaceholder')}
                   value={keyword}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   autoFocus/>
        </div>
    </div>
}

export default SearchInput