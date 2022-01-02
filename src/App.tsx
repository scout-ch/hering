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
export const LinksContext = React.createContext<LinkT[]>([])

function App() {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  const [sections, setSections] = React.useState(null);
  const [links, setLinks] = React.useState(null);
  const lang = i18n.language

  React.useEffect(() => {
    const sectionsPromise = client.get('/sections?_sort=sorting:ASC&_locale=' + lang)
    const linksPromise = client.get('/links?_locale=' + lang)

    Promise.all([sectionsPromise, linksPromise]).then((values) => {
      setSections(values[0].data)
      setLinks(values[1].data)
    })
  }, [lang])

  library.add(faCalendar, faExclamationTriangle, faBars)

  if (!sections || !links) return null
  //@ts-ignore
  const sectionsByKey = sections.reduce(function (map, section: SectionT) {
    map[section.slug] = section
    return map
  }, {})

  return <Router basename="/">
    <LinksContext.Provider value={links}>
      <div className="App">

        <Navigation sections={sections}></Navigation>

        <Switch>
          <Route path="/calendar" >
            <CalendarPage />
          </Route>
          <Route path="/:slug" children={<SectionPage sections={sectionsByKey} />} />
          <Route exact path="/">
            <HomePage></HomePage>
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
    </LinksContext.Provider>
  </Router>
}

export default withTranslation()(App);
