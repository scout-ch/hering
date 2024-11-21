import { createRoot } from 'react-dom/client';
import './style.less';
import App from './App';
import React from 'react';
import { ModalProvider } from './components/modal/ModalContext';
import Modal from "./components/modal/Modal";

const container = document.getElementById('root');
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <ModalProvider>
            <App/>
            <Modal/>
        </ModalProvider>
    </React.StrictMode>
);