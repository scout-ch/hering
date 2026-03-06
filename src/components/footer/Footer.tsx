import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { router } from '../../router'
import FooterSvg from './FooterSvg'
import PbsLogoSvg from './PbsLogoSvg'
import './footer.less'

function Footer() {

    const { i18n } = useTranslation()
    const lang = i18n.language
    const currentYear = new Date().getFullYear()

    const changeLanguage = async (newLang: string) => {
        if (newLang === lang) {
            return
        }

        await i18n.changeLanguage(newLang)

        const newPath = window.location.pathname.replace(`/${lang}`, `/${newLang}`)
        router.history.replace(`${newPath}${window.location.search}${window.location.hash}`)
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
                                onClick={() => changeLanguage('de')}
                                aria-label={'Deutsch'}>Deutsch
                        </button>
                        <button className={lang === 'fr' ? 'active' : ''}
                                onClick={() => changeLanguage('fr')}
                                aria-label={'Français'}>Français
                        </button>
                        <button className={lang === 'it' ? 'active' : ''}
                                onClick={() => changeLanguage('it')}
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
