import { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import './loading.less'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

type Props = {
    isLoading?: boolean
    centerInViewport?: boolean
    subtext?: string
    showWaitMessages?: boolean
}

export default function Loading(props: Props) {

    const { t } = useTranslation()
    const [subtextInternal, setSubtextInternal] = useState<string | undefined>(props.subtext)

    useEffect(() => {
        if (!props.showWaitMessages) {
            return;
        }

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
    }, [t, props.showWaitMessages]);

    if (props.isLoading !== undefined && !props.isLoading) {
        return <></>
    }

    return <div className='loading-container' style={{ height: getLoadingHeight(props.centerInViewport) }}>
        <div className='icon'>
            <FontAwesomeIcon icon={faCircleNotch} spin={true} size={'2xl'}/>
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