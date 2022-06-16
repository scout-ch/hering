import sectionsDE from './../data/sections/sections.de.json'
import sectionsFR from './../data/sections/sections.fr.json'
import sectionsIT from './../data/sections/sections.it.json'
import linksDE from './../data/links/de.json'
import linksFR from './../data/links/fr.json'
import linksIT from './../data/links/it.json'

import startPageDE from './../data/start-page/de.json'
import startPageFR from './../data/start-page/fr.json'
import startPageIT from './../data/start-page/it.json'

import calendarPageDE from './../data/calendar-page/de.json'
import calendarPageFR from './../data/calendar-page/fr.json'
import calendarPageIT from './../data/calendar-page/it.json'

import searchPageDE from './../data/search-page/de.json'
import { SectionT } from '../components/Section'

export function setLocalData(lang: string, setSections: React.Dispatch<React.SetStateAction<null>>, setLinks: React.Dispatch<React.SetStateAction<null>>, setStartPage: React.Dispatch<React.SetStateAction<null>>, setCalendarPage: React.Dispatch<React.SetStateAction<null>>, setSearchPage: React.Dispatch<React.SetStateAction<null>>) {
  if (lang === 'de') {
    // @ts-ignore
    setSections(sectionsDE);
    // @ts-ignore
    setLinks(linksDE);
    // @ts-ignore
    setStartPage(startPageDE);
    // @ts-ignore
    setCalendarPage(calendarPageDE);
    // @ts-ignore
    setSearchPage(searchPageDE);
  } else if (lang === 'it') {
    // @ts-ignore
    setSections(sectionsIT);
    // @ts-ignore
    setLinks(linksIT);
    // @ts-ignore
    setStartPage(startPageIT);
    // @ts-ignore
    setCalendarPage(calendarPageIT);
    // // @ts-ignore
    // setSearchPage(searchPageIT);
  } else if (lang === 'fr') {
    // @ts-ignore
    setSections(sectionsFR);
    // @ts-ignore
    setLinks(linksFR);
    // @ts-ignore
    setStartPage(startPageFR);
    // @ts-ignore
    setCalendarPage(calendarPageFR);
    // // @ts-ignore
    // setSearchPage(searchPageFR);
  }
}

export function getLocalSectionData(lang: string): SectionT[] {
  if (lang === 'de') {
    return sectionsDE
  } else if (lang === 'fr') {
    return sectionsFR
  } else if (lang === 'it') {
    return sectionsIT
  }
  return [];
}