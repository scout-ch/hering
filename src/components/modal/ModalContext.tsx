import React, { createContext, type ReactNode, useState } from 'react';

interface ModalContextProps {
    openModal<T = any>(content: ReactNode, options?: ModalOptions): Promise<ModalResult<T>>;

    openModal<T = any, P = any>(content: React.ComponentType<P>, props: P, options?: ModalOptions): Promise<ModalResult<T>>;

    closeModal(): void;

    modalContent: ReactNode | null;
    modalOptions: ModalOptions;
    resolveModal?: (data: ModalResult) => void;
}

export interface ModalResult<T = any> {
    isCancelled: boolean;
    data?: T;
}

export interface ModalOptions {
    isWide?: boolean;
}

export const ModalContext = createContext<ModalContextProps>({
    openModal: async () => ({ isCancelled: true }),
    closeModal: () => {
    },
    modalContent: null,
    modalOptions: {},
    resolveModal: undefined,
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [modalOptions, setModalOptions] = useState<ModalOptions>({});
    const [resolveModal, setResolveModal] = useState<(result: ModalResult) => void>();

    function openModal<T = any>(content: ReactNode, options?: ModalOptions): Promise<ModalResult<T>>;
    function openModal<P, T = any>(content: React.ComponentType<P>, props: P, options?: ModalOptions): Promise<ModalResult<T>>;
    function openModal(content: any, props?: any, options?: ModalOptions): Promise<ModalResult> {
        return new Promise<ModalResult>((resolve) => {
            if (typeof content === 'function') {
                const Component = content;
                setModalContent(<Component {...props} />);
                setModalOptions(options || {});
            } else {
                setModalContent(content);
                setModalOptions(props || {}); // In case of a ReactNode 'props' are the'options'
            }
            setResolveModal(() => resolve);
        });
    }

    const closeModal = () => {
        setModalContent(null);
        setModalOptions({});
        setResolveModal(undefined);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, modalContent, modalOptions, resolveModal }}>
            {children}
        </ModalContext.Provider>
    );
};