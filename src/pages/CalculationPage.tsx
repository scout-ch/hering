// import styled from '@emotion/styled'
import React from 'react'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Header } from '../App'
import { withRouter } from 'react-router';
import TodoCalculation from '../components/TodoCalculation';

function CalculationPage() {

  return <div>
    <MainContainer>
      <Header></Header>
      <h1><FontAwesomeIcon icon="hands-helping" /> Datumsliste</h1>

      <TodoCalculation />

      <button type="button">Download</button>
    </MainContainer>
  </div>
}
export default withRouter(CalculationPage)
