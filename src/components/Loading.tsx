import React, {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";

type Props = {
    isLoading?: boolean
    centerInViewport?: boolean
    subtext?: string
}

export default function Loading(probs: Props) {

    const {t} = useTranslation()
    const [subtextInternal, setSubtextInternal] = useState<string | undefined>(probs.subtext)

    useEffect(() => {
        const waitOneTimeoutId = setTimeout(() => {
            setSubtextInternal(t('loading.waitOne'))
        }, 5000);

        const waitTwoTimeoutId = setTimeout(() => {
            setSubtextInternal(t('loading.waitTwo'))
        }, 15000);

        return () => {
            clearTimeout(waitOneTimeoutId);
            clearTimeout(waitTwoTimeoutId);
        }
    }, []);

    if (probs.isLoading !== undefined && !probs.isLoading) {
        return <></>
    }

    return <div className='loading-container' style={{height: getLoadingHeight(probs.centerInViewport)}}>
        <div>
            <div className='loading-spinner'></div>
        </div>
        {subtextInternal && subtextInternal.length > 0 &&
            <div>
                {subtextInternal}
            </div>
        }
    </div>
}

function getLoadingHeight(centerInViewPort: boolean | undefined) {
    if (!centerInViewPort) {
        return '';
    }

    const footer = document.getElementById('footer')
    if (!footer) {
        return '';
    }

    const height = footer.clientHeight
    return `calc(100dvh - ${height}px)`
}