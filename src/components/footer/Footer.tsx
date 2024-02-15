import React from 'react'
import styled from '@emotion/styled'
import i18n from '../../i18n'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {SectionT} from '../../pages/section/components/Section'
import client from '../../client'
import FooterSvg from './FooterSvg'
import PbsLogoSvg from './PbsLogoSvg'
import './footer.less'


const Button = styled.button`
    border: none;
    background: none;
    color: white;

    &:hover {
        color: white;
        opacity: 0.5;
    }
`
type Props = {
    sections: SectionT[]
}

function Footer(props: Props) {

    const lang = i18n.language
    const location = useLocation();
    const navigate = useNavigate();

    const changeLanguage = (lang: string, oldSections: SectionT[]) => {
        let redirect = false

        const path = location.pathname.replace('/', '')
        const currentSection = oldSections.find((s) => s['slug'] === path)

        i18n.changeLanguage(lang).then((_t) => {
            if (path === 'calendar') {
                window.location.reload();
                redirect = true
                return
            }

            if (path === 'impressum') {
                redirect = true
                return
            }

            client.get('/sections?_sort=sorting:ASC&_locale=' + lang).then((response: { data: any[] }) => {
                if (currentSection) {
                    const otherSection = currentSection['localizations'].find((l: any) => {
                        return l.locale === lang
                    })

                    const newCurrentSection = response.data.find((s: any) => {
                        return s['id'] === otherSection['id']
                    })

                    if (newCurrentSection) {
                        redirect = true
                        navigate('/' + newCurrentSection.slug)
                    }
                }
            }).finally(() => {
                if (!redirect) {
                    navigate('/')
                }
            })
        });
    }

    return <>
        <div className='footer-image'>
            <FooterSvg/>
        </div>
        <div className="footer-content">
            <nav className="footer-nav">
                <div className='footer-logo'>
                    <PbsLogoSvg/>
                </div>
                <ul>
                    <li>
                        <Button className={lang === 'de' ? 'active' : ''}
                                onClick={() => changeLanguage('de', props.sections)}>Deutsch</Button>
                        <Button className={lang === 'fr' ? 'active' : ''}
                                onClick={() => changeLanguage('fr', props.sections)}>Français</Button>
                        <Button className={lang === 'it' ? 'active' : ''}
                                onClick={() => changeLanguage('it', props.sections)}>Italiano</Button>
                    </li>
                </ul>
            </nav>
            <div className='footer-bottom'>
                <p className="footer-copyright">© 2023 Pfadibewegung Schweiz</p>
                <ul className='footer-bottom-nav'>
                    <li className="child">
                        <Link to="/impressum">Impressum</Link>
                    </li>
                </ul>
            </div>
        </div>
    </>
}

export default Footer