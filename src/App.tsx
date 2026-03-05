import { useEffect } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Loading from "./components/loading/Loading";
import { useDocumentTitle } from "./components/page-title";
import { router } from './router';

export default function App() {

    const { t, i18n } = useTranslation()
    const lang = i18n.language
    const { setBaseTitle } = useDocumentTitle();

    useEffect(() => {
        setBaseTitle(t('homePage.title'));
    }, [lang])

    if (!i18n.isInitialized) {
        return <div className='app-init'>
            <Loading subtext={t('homePage.loading', 'Loading...')} showWaitMessages={true}/>
        </div>
    }

    return <div className='app'>
        <RouterProvider router={router}/>
    </div>
}
