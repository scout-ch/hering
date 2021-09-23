// import styled from '@emotion/styled'
import React from 'react'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Header } from '../App'
import { withRouter } from 'react-router';
import jsonData from "../data/kapitel/1_vorbereitung.json"
import Chapter from '../components/Chapter'
import PreparationText from '../data/kapitel/1_vorbereitung.md';


function PreparationPage() {
  const targets = jsonData.targets.map((target) => target.toUpperCase()).join(', ')

  return <div>
    <MainContainer>
      <Header></Header>
      <div className="targets">{targets}</div>
      <h1><FontAwesomeIcon icon="scroll" /> {jsonData.title.de}</h1>
      <Chapter markdown={PreparationText}></Chapter>
    </MainContainer>
  </div>
}
export default withRouter(PreparationPage)
