import { createRoot } from 'react-dom/client';
import './style.less';
import App from './App';
import React from 'react';
import { ModalProvider } from './components/modal/ModalContext';
import Modal from "./components/modal/Modal";
import { defaultLanguage, hasSupportedLanguageInUrl, i18n, redirectToLanguage } from "./i18n";
import { DocumentTitleProvider } from "./components/page-title";

// Only render the app if the language is supported, otherwise redirect to a supported language
if (hasSupportedLanguageInUrl()) {
    const root = createRoot(document.getElementById('root')!)
    root.render(
        <React.StrictMode>
            <DocumentTitleProvider baseTitle={'HERING'}>
                <ModalProvider>
                    <App/>
                    <Modal/>
                </ModalProvider>
            </DocumentTitleProvider>
        </React.StrictMode>
    );
} else {
    redirectToLanguage(i18n.resolvedLanguage || defaultLanguage)
}