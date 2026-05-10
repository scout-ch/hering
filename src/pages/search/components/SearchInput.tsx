import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next"
import { faCircleNotch, faSearch } from "@fortawesome/free-solid-svg-icons";

type Props = {
    keyword?: string,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    isDisabled?: boolean
    isPending?: boolean
}

function SearchInput(props: Props) {

    const { t } = useTranslation()
    const { keyword, onChange, onKeyDown, isPending } = props

    return <div className='search-input'>
        <div className='icon-input'>
            <div className='icon'>
                <FontAwesomeIcon icon={isPending ? faCircleNotch : faSearch} spin={isPending}/>
            </div>
            <input type='text'
                   name='search'
                   className='search'
                   placeholder={t('searchPage.searchPlaceholder')}
                   value={keyword}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   disabled={props.isDisabled}
                   autoFocus/>
        </div>
    </div>
}

export default SearchInput