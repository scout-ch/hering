// import styled from '@emotion/styled'
import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'

import { withRouter } from 'react-router';

function HomePage() {

  return <MainContainer>
    <Helmet>
      <title>Hering</title>
    </Helmet>
    
    <header className="App-header">
      <h1>Hallo Hering</h1>
    </header>

  </MainContainer>
}
export default withRouter(HomePage)