import React from 'react'
import { withTranslation } from 'react-i18next'
import { Role } from './Chapter'

type Props = {
  t: any
  targets: Array<Role>
}

function Target(props: Props) {
 const { t, targets } = props

  const targetList = targets.map(function (target: Role) {
    return <>
      <div className='role'>{t(`target.role.${target.rolle}`)}</div>
    </>
  })

  return <div className='targets'>
    {targetList}
  </div>
}

export default withTranslation()(Target)