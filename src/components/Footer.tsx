import React from 'react'
import { ReactComponent as FooterLogo } from './../images/footer.svg'
import styled from '@emotion/styled';
import i18n from './../i18n';

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
}

function Footer(props: Props) {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  
  return <>
    <FooterLogo></FooterLogo>
    <nav className="footer-nav">
      <ul>
        <li>
          <Button className={props.lang === 'de' ? 'active' : ''} onClick={() => changeLanguage('de')}>Deutsch</Button>
          <Button className={props.lang === 'fr' ? 'active' : ''} onClick={() => changeLanguage('fr')}>Français</Button>
        </li>
      </ul>
    </nav>
  </>

}

export default Footer