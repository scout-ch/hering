import React from 'react'

import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  content: string
}

function Warning(props: Props) {
    const { content } = props;
    return (
      <WarningDiv>
        <FontAwesomeIcon icon="exclamation-triangle"/>
        {content}
      </WarningDiv>
    );
}

export default Warning