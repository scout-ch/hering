import React from 'react'
import Section, {SectionT} from './components/Section'
import {useParams} from 'react-router'

type Params = {
    slug: string
}

export type SectionsByKey = {
    [key: string]: SectionT
}

type Props = {
    sections: SectionsByKey
}

function SectionPage(props: Props) {
    const {slug} = useParams<Params>()
    const section = props.sections[slug || '']

    return section
        ? <Section section={section}/>
        : null;
}

export default SectionPage
