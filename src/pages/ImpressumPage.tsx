import React from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkComponent } from '../helper/MarkdownComponents';
import { withTranslation } from 'react-i18next'
// import client from '../client';
import impressumPageFR from './../data/impressum-page/fr.json'
import impressumPageDE from './../data/impressum-page/de.json'
import impressumPageIT from './../data/impressum-page/it.json'
import i18n from '../i18n';

export type ImpressumPageT = {
  title: string
  menu_name: string
  content: string
}

function ImpressumPage() {
  const lang = i18n.language
  
  const [impressumPage, setImpressumPage] = React.useState<ImpressumPageT>();

  React.useEffect(() => {
    // client.get('/impressum-page?_locale=' + lang).then((response: { data: any }) => {
    //   setImpressumPage(response.data)
    // })
    switch (i18n.language) {
      case 'fr':
        // @ts-ignore
        return setImpressumPage(impressumPageFR)
      case 'de':
        // @ts-ignore
        return setImpressumPage(impressumPageDE)
      case 'it':
        // @ts-ignore
        return setImpressumPage(impressumPageIT)
      default:
        // @ts-ignore
        setImpressumPage(impressumPageDE)
    }
  }, [lang])

  if (!impressumPage) return null

  return <div className='content-main'>
    <Helmet>
      <title>{impressumPage.title}</title>
    </Helmet>
    <div className='calendar'>
      <h1><FontAwesomeIcon icon="calendar" /> {impressumPage.title}</h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={LinkComponent}
      >{impressumPage.content}</ReactMarkdown>

    </div>
  </div>
}
export default withTranslation()(ImpressumPage)
