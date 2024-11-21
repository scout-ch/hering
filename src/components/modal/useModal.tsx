import { useContext } from 'react';
import { ModalContext } from './ModalContext';

export const useModal = () => {
    const { closeModal, resolveModal } = useContext(ModalContext);

    const close = <T, >(result: T) => {
        if (resolveModal) {
            resolveModal({ isCancelled: false, data: result });
        }
        closeModal();
    };

    const cancel = () => {
        if (resolveModal) {
            resolveModal({ isCancelled: true });
        }
        closeModal();
    };

    return {
        close,
        cancel,
    };
};
