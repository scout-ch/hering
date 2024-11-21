import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext, ModalResult } from './ModalContext';
import './modal.less'

const Modal: React.FC = () => {
    const modalRoot = document.getElementById('modal-root');

    const { modalContent, modalOptions, closeModal, resolveModal } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Focus on the modal when it opens
        if (modalContent && modalRef.current) {
            modalRef.current.focus();
        }

        if (modalContent) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            setIsVisible(false);
            document.body.style.overflow = ''; // Restore scrolling
        }
    }, [modalContent]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose({ isCancelled: true });
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [resolveModal]);

    const handleClose = (result: ModalResult) => {
        setIsVisible(false);
        setTimeout(() => {
            closeModal();
            if (resolveModal) {
                resolveModal(result);
            }
        }, 300);
    };

    if (!modalRoot || (!modalContent && !isVisible)) {
        return null;
    }

    return createPortal(<>
        <div className={`modal-overlay ${isVisible ? 'show' : ''}`}
             onClick={() => handleClose({ isCancelled: true })}
             aria-modal="true"
             role="dialog">
            <div className={`modal-wrapper ${isVisible ? 'show' : ''} ${modalOptions.isWide ? 'wide' : ''}`}
                 onClick={(e) => e.stopPropagation()}
                 ref={modalRef}
                 tabIndex={-1}>
                {modalContent}
            </div>
        </div>
    </>, modalRoot);
};

export default Modal;