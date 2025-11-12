import { createRoot } from 'react-dom/client';
import './style.less';
import App from './App';
import React from 'react';
import { ModalProvider } from './components/modal/ModalContext';
import Modal from "./components/modal/Modal";
import { hasSupportedLanguageInUrl, redirectToLanguage } from "./i18n";
import { DocumentTitleProvider } from "./components/page-title";
import { QueryClientProvider, } from '@tanstack/react-query'
import { queryClient } from "./apis/query-client";

// Only render the app if the language is supported, otherwise redirect to a supported language
if (hasSupportedLanguageInUrl()) {
    const root = createRoot(document.getElementById('root')!)
    root.render(
        <React.StrictMode>
            <DocumentTitleProvider baseTitle={'HERING'}>
                <ModalProvider>
                    <QueryClientProvider client={queryClient}>
                        <App/>
                        <Modal/>
                    </QueryClientProvider>
                </ModalProvider>
            </DocumentTitleProvider>
        </React.StrictMode>
    );
} else {
    redirectToLanguage()
}