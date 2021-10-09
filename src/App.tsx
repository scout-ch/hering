import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as ReactLogo } from './images/footer.svg'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { faScroll, faLock, faTools, faShoppingCart, faUsers, faHandsHelping, faArrowLeft, faCalendar, faCheck, faBook, faBookReader } from '@fortawesome/free-solid-svg-icons'
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
import ServicePage from './pages/ServicePage';
import CampDossierPage from './pages/CampDossierPage';
import CampClosingPage from './pages/CampClosingPage';
import CampApprovalPage from './pages/CampApprovalPage';
import OfferClosingPage from './pages/OfferClosingPage';


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
  padding-top: 100px;

  svg {
    width: 100%;
    height: auto;
    fill: var(--color-primary);
  }
  nav {
    display: flex;
    padding-bottom: 20px;

    button {
      padding: 0.9em 0.8em;
    }

    button.active {
      background: white;
      color: var(--color-primary-light);
    }
  }
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
  const { t } = useTranslation()

  return <nav>
    <ul>
      <li><Link to="/">HERING</Link></li>
      <li><Link to="/vorbereitung"><FontAwesomeIcon icon="scroll" /> {t('preparationPage.title')}</Link></li>
      <li><Link to="/lageranmeldung"><FontAwesomeIcon icon="lock" />  {t('campRegistrationPage.title')}</Link></li>
      <li><Link to="/dienstleistungen"><FontAwesomeIcon icon="tools" /> {t('servicePage.title')}</Link></li>
      <li><Link to="/lagerdossier"><FontAwesomeIcon icon="users" />  {t('campDossierPage.title')}</Link></li>
      <li><Link to="/lagerbewilligung"><FontAwesomeIcon icon="check" />  {t('campApprovalPage.title')}</Link></li>
      <li><Link to="/lagerabschluss"><FontAwesomeIcon icon="book" />  {t('campClosingPage.title')}</Link></li>
      <li><Link to="/abschluss"><FontAwesomeIcon icon="book-reader" />  {t('offerClosingPage.title')}</Link></li>
      <li><Link to="/calendar"><FontAwesomeIcon icon="calendar" /> {t('calendarPage.title')}</Link></li>
    </ul>
  </nav>
}

function App() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  const [sections, setSections] = React.useState(null);
  const lang = i18n.language

  React.useEffect(() => {
    client.get('/sections?_sort=sorting:ASC&_locale=' + lang).then((response: { data: any; }) => {
      setSections(response.data)
    })
  }, [lang])

  library.add(faScroll, faLock, faTools, faShoppingCart, faUsers, faHandsHelping, faArrowLeft, faCalendar, faCheck, faBook, faBookReader)

  if (!sections) return null
  //@ts-ignore
  const sectionsByKey = sections.reduce(function (map, section) {
    map[section.key] = section
    return map
  }, {})

  return <Router basename="/">
    <div className="App">

      <Navigation></Navigation>

      <Switch>
        <Route path="/vorbereitung">
          <PreparationPage section={sectionsByKey.vorbereitung} />
        </Route>
        <Route path="/lageranmeldung">
          <CampRegistrationPage section={sectionsByKey.lageranmeldung} />
        </Route>
        <Route path="/dienstleistungen">
          <ServicePage section={sectionsByKey.dienstleistungen} />
        </Route>
        <Route path="/lagerdossier">
          <CampDossierPage section={sectionsByKey.lagerdossier} />
        </Route>
        <Route path="/lagerbewilligung">
          <CampApprovalPage section={sectionsByKey.lagerbewilligung} />
        </Route>
        <Route path="/lagerabschluss">
          <CampClosingPage section={sectionsByKey.lagerabschluss} />
        </Route>
        <Route path="/abschluss">
          <OfferClosingPage section={sectionsByKey.abschluss} />
        </Route>
        <Route path="/calendar">
          <CalendarPage />
        </Route>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>
    </div>
    <Footer>
      <ReactLogo></ReactLogo>
      <nav>
        <ul>
          <li>
            <Button className={lang === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>Deutsch</Button>
            <Button className={lang === 'fr' ? 'active' : ''} onClick={() => changeLanguage('fr')}>Français</Button>
          </li>
        </ul>
      </nav>
    </Footer>

  </Router>
}

export default withTranslation()(App);
