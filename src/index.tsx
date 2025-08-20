import { createRoot } from 'react-dom/client';
import './style.less';
import App from './App';
import React from 'react';
import { ModalProvider } from './components/modal/ModalContext';
import Modal from "./components/modal/Modal";
import { defaultLanguage, i18n, hasSupportedLanguageInUrl, redirectToLanguage } from "./i18n";

// Only render the app if the language is supported, otherwise redirect to a supported language
if (hasSupportedLanguageInUrl()) {
    const root = createRoot(document.getElementById('root')!)
    root.render(
        <React.StrictMode>
            <ModalProvider>
                <App/>
                <Modal/>
            </ModalProvider>
        </React.StrictMode>
    );
} else {
    redirectToLanguage(i18n.resolvedLanguage || defaultLanguage)
}