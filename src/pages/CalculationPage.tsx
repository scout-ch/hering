// import styled from '@emotion/styled'
import React from 'react'
import { Helmet } from 'react-helmet'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Back } from '../App'
import { withRouter } from 'react-router';
import TodoCalculation from '../components/TodoCalculation';

function CalculationPage() {

  return <MainContainer>
    <Helmet>
      <title>Datumsliste</title>
    </Helmet>
    <Back />
    <h1><FontAwesomeIcon icon="hands-helping" /> Datumsliste</h1>

    <TodoCalculation />

  </MainContainer>
}
export default withRouter(CalculationPage)
