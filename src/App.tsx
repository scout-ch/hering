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
import CampRegistrationPage from './pages/CampRegistrationPage';
import HomePage from './pages/HomePage ';
import CalendarPage from './pages/CalendarPage';
import client from "./client";
import i18n from './i18n';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';


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
const Button = styled.button`
  border: none;
  background: none;
  color: white;

  &:hover {
    color: white;
    opacity: 0.5;
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

export const Back = () => {
  return <div>
    <pre className="back"><Link to="/" ><FontAwesomeIcon icon="arrow-left" /></Link></pre>
  </div>
}

export const Navigation = () => {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  const { t } = useTranslation()
  const lang = i18n.language

  return <Nav role="nav">
    <ul>
      <li><Link to="/hering">HERING</Link></li>
      <li><Link to="/hering/vorbereitung"><FontAwesomeIcon icon="scroll" /> {t('preparationPage.title')}</Link></li>
      <li><Link to="/hering/lageranmeldung"><FontAwesomeIcon icon="lock" />  {t('campRegistrationPage.title')}</Link></li>
      <li><Link to="/hering/dienstleistungen"><FontAwesomeIcon icon="tools" /> Dienstleistungen</Link></li>
      <li><Link to="/hering/lagerdossier"><FontAwesomeIcon icon="users" /> Lagerdossier</Link></li>
      <li><Link to="/hering/calendar"><FontAwesomeIcon icon="calendar" /> {t('calendarPage.title')}</Link></li>

      <li>
        <Button className={lang === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>DE</Button>
        <Button className={lang === 'fr' ? 'active' : ''} onClick={() => changeLanguage('fr')}>FR</Button>
      </li>
    </ul>
  </Nav>
}

function App() {
  const [sections, setSections] = React.useState(null);
  const lang = i18n.language

  React.useEffect(() => {
    client.get('/sections?_sort=sorting:ASC&_locale=' + lang).then((response: { data: any; }) => {
      setSections(response.data)
    })
  }, [lang])

  library.add(faScroll, faLock, faTools, faShoppingCart, faUsers, faHandsHelping, faArrowLeft, faCalendar)

  if (!sections) return null
  //@ts-ignore
  const sectionsByKey = sections.reduce(function (map, section) {
    map[section.key] = section
    return map
  }, {})

  return <Router>
    <div className="App">

      <Navigation></Navigation>

      <Switch>
        <Route path="/hering/vorbereitung">
          <PreparationPage section={sectionsByKey.vorbereitung} />
        </Route>
        <Route path="/hering/lageranmeldung">
          <CampRegistrationPage section={sectionsByKey.lageranmeldung} />
        </Route>
        <Route path="/hering/calendar">
          <CalendarPage />
        </Route>
        <Route exact path="/hering/">
          <HomePage></HomePage>
        </Route>
      </Switch>
    </div>
    <Footer></Footer>

  </Router>
}

export default withTranslation()(App);
