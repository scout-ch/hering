// import styled from '@emotion/styled'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Section, { SectionT } from '../components/Section'
import { useParams } from 'react-router'

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
  const section = props.sections[slug]
  if (!section) return null

  return <Section section={section} icon={<FontAwesomeIcon icon="scroll"/>} />
}
export default SectionPage
