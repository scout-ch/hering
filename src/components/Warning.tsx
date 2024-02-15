import React from 'react'

import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const WarningDiv = styled.div`
    border: 1px solid black;
    border-radius: 4px;
    display: flex;
    padding: 10px;

    p {
        padding: 0 10px;
        margin: 0;
    }
`

type Props = {
    content: any
}

export default function Warning(props: Props) {
    const {content} = props;

    return (
        <WarningDiv>
            <div>
                <FontAwesomeIcon icon={faExclamationTriangle}/>
            </div>
            {content}
        </WarningDiv>
    );
}