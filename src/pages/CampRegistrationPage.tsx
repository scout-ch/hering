import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Section, { SectionT } from '../components/Section'

type Props = {
  section: SectionT
}

function CampRegistrationPage(props: Props) {

  const section = props.section
  if (!section) return null
  
  return <Section section={section} icon={<FontAwesomeIcon icon="lock"/>} />
}
export default CampRegistrationPage
