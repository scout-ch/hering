import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as ReactLogo } from './images/footer.svg'
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
import { ChapterT } from './components/Chapter';


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
      color: var(--color-primary-ligt);
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
      <li><Link to="/hering">HERING</Link></li>
      <li><Link to="/hering/vorbereitung"><FontAwesomeIcon icon="scroll" /> {t('preparationPage.title')}</Link></li>
      <li><Link to="/hering/lageranmeldung"><FontAwesomeIcon icon="lock" />  {t('campRegistrationPage.title')}</Link></li>
      <li><Link to="/hering/dienstleistungen"><FontAwesomeIcon icon="tools" /> Dienstleistungen</Link></li>
      <li><Link to="/hering/lagerdossier"><FontAwesomeIcon icon="users" /> Lagerdossier</Link></li>
      <li><Link to="/hering/calendar"><FontAwesomeIcon icon="calendar" /> {t('calendarPage.title')}</Link></li>
    </ul>
  </nav>
}
export type Section = {
  chapters: Array<ChapterT>
  sorting: number
  title: string
  content: string
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
