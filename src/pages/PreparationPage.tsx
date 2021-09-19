// import styled from '@emotion/styled'
import React from 'react'
import { MainContainer } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Header } from '../App'
import { withRouter } from 'react-router';
import jsonData from "../data/kapitel/1_vorbereitung.json";
import Chapter from '../components/Chapter';


function PreparationPage() {
  // const icon = jsonData['icon']
  const chapters = jsonData['chapters'].map((chapter) =>
    <Chapter chapter={chapter}></Chapter>
  )

  return <div>
    <MainContainer>
      <Header></Header>
      <h1><FontAwesomeIcon icon="scroll" /> {jsonData['title']['de']}</h1>
      <p>
        {jsonData['intro']['de']}
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      {chapters}
    </MainContainer>
  </div>
}
export default withRouter(PreparationPage)
