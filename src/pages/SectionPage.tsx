import React from 'react'
import Section, {SectionT} from '../components/Section'
import {useParams} from 'react-router'
import {withTranslation} from 'react-i18next'

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
    const {slug} = useParams<Params>()
    const section = props.sections[slug || '']

    return section
        ? <Section section={section}/>
        : null;
}

export default withTranslation()(SectionPage)
