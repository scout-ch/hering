// import styled from '@emotion/styled'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Section, { SectionT } from '../components/Section'
import { useParams } from 'react-router'
import { ChapterT } from '../components/Chapter'

type Params = {
  slug: string
}

export type LinkT = {
  title: string
  Link: string | null
  key: string
  chapter: ChapterT | null
}

type SectionsByKey = {
  [key: string]: SectionT
}

type Props = {
  sections: SectionsByKey
  links: LinkT[]
}

function SectionPage(props: Props) {
  const { slug } = useParams<Params>()
  const section = props.sections[slug]
  if (!section) return null

  return <Section section={section} links={props.links} />
}
export default SectionPage
