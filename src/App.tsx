import React from 'react';
import styled from '@emotion/styled';
import FooterImage from './images/footer.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { faScroll, faLock, faTools, faShoppingCart, faUsers, faHandsHelping, faArrowLeft, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PreparationPage from './pages/PreparationPage';
import HomePage from './pages/HomePage ';
import CalculationPage from './pages/CalculationPage';


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: var(--color-primary);

  &>ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a, button {
    color: white;
    opacity: 1;
    display: block;
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    min-width: 180px;
  }
`

const Footer = styled.footer`
  background-image: url(${FooterImage});
  background-repeat: repeat-x;
  height: 236px;
`

export const MainContainer = styled.main`
  padding: 1rem;
  flex-grow: 1;
`

export const Header = () => {
  return <div>
    <pre className="back"><Link to="/" ><FontAwesomeIcon icon="arrow-left" /></Link></pre>
  </div>
}

export const Navigation = () => {
  return <Nav role="nav">
    <ul>
      <li><Link to="/">HERING</Link></li>
      <li><Link to="/vorbereitung"><FontAwesomeIcon icon="scroll" /> Vorbereitung</Link></li>
      <li><Link to="/lageranmeldung"><FontAwesomeIcon icon="lock" />  Lageranmeldung</Link></li>
      <li><Link to="/dienstleistungen"><FontAwesomeIcon icon="tools" /> Dienstleistungen</Link></li>
      <li><Link to="/lagerdossier"><FontAwesomeIcon icon="users" /> Lagerdossier</Link></li>
      <li><Link to="/calculation"><FontAwesomeIcon icon="calendar" /> Datumsliste</Link></li>
    </ul>
  </Nav>
}

function App() {
  library.add(faScroll, faLock, faTools, faShoppingCart, faUsers, faHandsHelping, faArrowLeft, faCalendar)

  return <Router>
    <div className="App">

      <Navigation></Navigation>

      <Switch>
        <Route path="/vorbereitung">
          <PreparationPage />
        </Route>
        <Route path="/calculation">
          <CalculationPage />
        </Route>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>
      <Footer></Footer>
    </div>

  </Router>
}

export default App;
