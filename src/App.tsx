import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as ReactLogo } from './images/footer.svg'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { faCalendar, faExclamationTriangle, faBars } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HomePage from './pages/HomePage ';
import CalendarPage from './pages/CalendarPage';
import client from "./client";
import i18n from './i18n';
import { withTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import SectionPage from './pages/SectionPage';

export type LinkT = {
  title: string
  link: string | undefined
  key: string
  slug: string | null
}

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
    display: block;
    width: 100%;
    height: auto;
    fill: var(--color-primary);
  }

  @media (max-width: 659px) {
    padding-left: 0;

  }
  
  @media (min-width: 660px) {
    padding-left: 270px;
  }
  
  .footer-nav {
    display: flex;
    padding-bottom: 70px;
    padding-left: 20px;
    background-color: var(--color-primary);

    button {
      padding: 0.9em 0.8em;
    }

    button.active {
      background: white;
      color: var(--color-primary-light);
    }

    &>ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
`

export const MainContainer = styled.main`
  flex-grow: 1;
`

export const Back = () => {
  return <div>
    <pre className="back"><Link to="/" ><FontAwesomeIcon icon="arrow-left" /></Link></pre>
  </div>
}
export const LinksContext = React.createContext<LinkT[]>([])

function App() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  const [sections, setSections] = React.useState(null);
  const [links, setLinks] = React.useState(null);
  const [startPage, setStartPage] = React.useState(null);
  const [calendarPage, setCalendarPage] = React.useState(null);
  const lang = i18n.language

  React.useEffect(() => {
    const sectionsPromise = client.get('/sections?_sort=sorting:ASC&_locale=' + lang)
    const linksPromise = client.get('/links?_locale=' + lang)
    const startPagePromise = client.get('/start-page?_locale=' + lang)
    const calendarPromise = client.get('/calendar-page?_locale=' + lang)

    Promise.all([sectionsPromise, linksPromise, startPagePromise, calendarPromise]).then((values) => {
      setSections(values[0].data)
      setLinks(values[1].data)
      setStartPage(values[2].data)
      setCalendarPage(values[3].data)
    })
  }, [lang])

  library.add(faCalendar, faExclamationTriangle, faBars)

  if (!sections || !links || !startPage || !calendarPage) return null
  //@ts-ignore
  const sectionsByKey = sections.reduce(function (map, section: SectionT) {
    map[section.slug] = section
    return map
  }, {})

  return <Router basename="/">
    <LinksContext.Provider value={links}>
      <div className="App">

        <Navigation sections={sections} startPage={startPage} calendarPage={calendarPage}></Navigation>

        <Switch>
          <Route path="/calendar" >
            <CalendarPage page={calendarPage}/>
          </Route>
          <Route path="/:slug" children={<SectionPage sections={sectionsByKey} />} />
          <Route exact path="/">
            <HomePage page={startPage}></HomePage>
          </Route>
          <Route exact path="/hering/">
            <HomePage page={startPage}></HomePage>
          </Route>
        </Switch>
      </div>
      <Footer>
        <ReactLogo></ReactLogo>
        <nav className="footer-nav">
          <ul>
            <li>
              <Button className={lang === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>Deutsch</Button>
              <Button className={lang === 'fr' ? 'active' : ''} onClick={() => changeLanguage('fr')}>Français</Button>
            </li>
          </ul>
        </nav>
      </Footer>
    </LinksContext.Provider>
  </Router>
}

export default withTranslation()(App);
