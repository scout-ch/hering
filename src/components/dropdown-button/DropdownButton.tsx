import React, { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './dropdown-button.less';

type Props = {
    title?: string;
    buttonContent?: ReactNode;
    children: ReactNode;
}

interface OnClickCallback {
    onClick?: () => void;
}

const DropdownButton = ({ title, buttonContent, children }: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        if (!showDropdown) {
            // reset together with opening, so the layout effect below starts from the default direction
            setOpenUpwards(false);
        }
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event: PointerEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    const handleOptionClick = (optionCallback?: () => void) => {
        setShowDropdown(false);
        if (optionCallback) {
            optionCallback();
        }
    };

    useEffect(() => {
        // pointerdown instead of mousedown, since iOS Safari doesn't fire mouse events when tapping non-interactive elements
        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, []);

    // on small screens the button is often near the bottom of the viewport, so the options would be hidden below the fold
    useLayoutEffect(() => {
        const content = contentRef.current;
        const container = dropdownRef.current;
        if (!content || !container) {
            return;
        }

        const contentHeight = content.getBoundingClientRect().height;
        const containerRect = container.getBoundingClientRect();
        const fixedHeaderHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--fixed-header-height')) || 0;
        const fitsBelow = containerRect.bottom + contentHeight <= window.innerHeight;
        const fitsAbove = containerRect.top - contentHeight >= fixedHeaderHeight;

        if (!fitsBelow && fitsAbove) {
            setOpenUpwards(true);
        } else if (!fitsBelow) {
            content.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [showDropdown]);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button className="btn btn-primary dropdown-button" onClick={toggleDropdown} aria-expanded={showDropdown}>
                {!!title ? (
                    title
                ) : (!!buttonContent ? (
                        buttonContent
                    ) : ""
                )}
            </button>
            {showDropdown && (
                <div className={`dropdown-content${openUpwards ? ' dropdown-content--up' : ''}`} ref={contentRef}>
                    {React.Children.map(children, (child) => {
                            if (React.isValidElement<OnClickCallback>(child)) {
                                return React.cloneElement(child, {
                                    onClick: () => handleOptionClick(child.props.onClick),
                                });
                            }
                            return child;
                        }
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
