import React from 'react'
import { withTranslation } from "react-i18next"

type Props = {
    isLoading: boolean
}

function Loading(probs: Props) {

    const loadingView = () => {
        if (probs.isLoading) {
            return <div className='loading-container'>
                <div className='loading-spinner'></div>
            </div>
        }
        return <></>
    }

    return loadingView()
}

export default withTranslation()(Loading)