import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event: MouseEvent) => {
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button className="btn btn-primary dropdown-button" onClick={toggleDropdown}>
                {!!title ? (
                    title
                ) : (!!buttonContent ? (
                        buttonContent
                    ) : ""
                )}
            </button>
            {showDropdown && (
                <div className="dropdown-content">
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
