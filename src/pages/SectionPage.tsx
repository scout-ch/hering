// import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import Section, { SectionT } from '../components/Section'
import { useLocation, useParams } from 'react-router'
import { withTranslation } from 'react-i18next'

type Params = {
  slug: string
}

type SectionsByKey = {
  [key: string]: SectionT
}

type Props = {
  sections: SectionsByKey
}

function SectionPage(props: Props) {
  const { slug } = useParams<Params>()
  const section = props.sections[slug!]
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash
    if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView()
    } else {
        const title = document.getElementById('section-title')
        if (title) title.scrollIntoView()
    }
  });
  if (!section) return null
  return <Section section={section} />
}
export default withTranslation()(SectionPage)
