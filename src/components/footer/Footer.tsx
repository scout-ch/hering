import React from 'react'
import i18n from '../../i18n'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FooterSvg from './FooterSvg'
import PbsLogoSvg from './PbsLogoSvg'
import './footer.less'
import { loadSections, HApiSection } from "../../apis/hering-api";

type Props = {
    sections: HApiSection[]
}

function Footer(props: Props) {

    const lang = i18n.language
    const location = useLocation();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear()

    const changeLanguage = (lang: string, oldSections: HApiSection[]) => {
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

            loadSections(lang).then((sections: HApiSection[]) => {
                if (currentSection) {
                    const otherSection = currentSection['localizations'].find((l: any) => {
                        return l.locale === lang
                    })

                    const newCurrentSection = sections.find((s: any) => {
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
        <div id='footer' className='footer'>
            <div className='footer-image'>
                <FooterSvg/>
            </div>
            <div className="footer-content">
                <nav className="footer-nav">
                    <div className='footer-logo'>
                        <PbsLogoSvg/>
                    </div>
                    <div className='language-switcher'>
                        <button className={lang === 'de' ? 'active' : ''}
                                onClick={() => changeLanguage('de', props.sections)}
                                aria-label={'Deutsch'}>Deutsch
                        </button>
                        <button className={lang === 'fr' ? 'active' : ''}
                                onClick={() => changeLanguage('fr', props.sections)}
                                aria-label={'Français'}>Français
                        </button>
                        <button className={lang === 'it' ? 'active' : ''}
                                onClick={() => changeLanguage('it', props.sections)}
                                aria-label={'Italiano'}>Italiano
                        </button>
                    </div>
                </nav>
                <div className='footer-bottom'>
                    <div className="footer-copyright">© {currentYear} Pfadibewegung Schweiz</div>
                    <div className='footer-bottom-nav'>
                        <Link to="/impressum">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Footer