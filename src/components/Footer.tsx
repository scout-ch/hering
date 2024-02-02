import React from 'react'
import {ReactComponent as FooterLogo} from './../images/footer.svg'
import {ReactComponent as PBSLogo} from './../images/pbs_logo.svg'
import styled from '@emotion/styled';
import i18n from './../i18n';
import {Link, NavigateFunction, useLocation, useNavigate} from 'react-router-dom'
import {SectionT} from './Section';
import client from '../client';


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

    const changeLanguage = (lang: string, navigate: NavigateFunction, location: any, oldSections: SectionT[]) => {
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
            client.get('/sections?_sort=sorting:ASC&_locale=' + lang).then((response: { data: any }) => {
                // const newSections = getLocalSectionData(lang)
                if (currentSection) {
                    const otherSection = currentSection['localizations'].find((l: any) => {
                        return l.locale === lang
                    })
                    // @ts-ignore
                    const newCurrentSection = newSections.find((s: any) => {
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

    const location = useLocation();
    const navigate = useNavigate();

    return <>
        <div className='footer-image'><FooterLogo></FooterLogo></div>
        <div className="footer-content">
            <nav className="footer-nav">
                <div className='footer-logo'><PBSLogo></PBSLogo></div>
                <ul>
                    <li>
                        <Button className={props.lang === 'de' ? 'active' : ''}
                                onClick={() => changeLanguage('de', navigate, location, props.sections)}>Deutsch</Button>
                        <Button className={props.lang === 'fr' ? 'active' : ''}
                                onClick={() => changeLanguage('fr', navigate, location, props.sections)}>Français</Button>
                        <Button className={props.lang === 'it' ? 'active' : ''}
                                onClick={() => changeLanguage('it', navigate, location, props.sections)}>Italiano</Button>
                    </li>
                </ul>
            </nav>
            <div className='footer-bottom'>
                <p className="footer-copyright">© 2022 Pfadibewegung Schweiz</p>
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