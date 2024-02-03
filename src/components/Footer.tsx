import React from 'react'
import styled from '@emotion/styled';
import i18n from './../i18n';
import {Link, NavigateFunction, useLocation, useNavigate} from 'react-router-dom'
import {SectionT} from './Section';
import client from '../client';
import FooterSvg from './FooterSvg';
import PbsLogoSvg from './PbsLogoSvg';


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
    lang: string
    sections: SectionT[]
}

function Footer(props: Props) {
    const changeLanguage = (lang: string, history: NavigateFunction, location: any, oldSections: SectionT[]) => {
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
                        history('/' + newCurrentSection.slug)
                    }
                }
            }).finally(() => {
                if (!redirect) {
                    history('/')
                }
            })
        });
    }
    const location = useLocation();
    const history = useNavigate();

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
                        <Button className={props.lang === 'de' ? 'active' : ''}
                                onClick={() => changeLanguage('de', history, location, props.sections)}>Deutsch</Button>
                        <Button className={props.lang === 'fr' ? 'active' : ''}
                                onClick={() => changeLanguage('fr', history, location, props.sections)}>Français</Button>
                        <Button className={props.lang === 'it' ? 'active' : ''}
                                onClick={() => changeLanguage('it', history, location, props.sections)}>Italiano</Button>
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