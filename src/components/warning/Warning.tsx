import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import './warning.less'

type Props = {
    content: any
}

export default function Warning(props: Props) {
    const { content } = props;

    return (
        <div className="warning">
            <div>
                <FontAwesomeIcon icon={faExclamationTriangle}/>
            </div>
            {content}
        </div>
    );
}