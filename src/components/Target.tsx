import React from 'react'
import {useTranslation} from 'react-i18next'
import {Role} from './Chapter'

type Props = {
    targets: Role[]
}

function Target(props: Props) {

    const {t} = useTranslation()

    const targetList = props.targets.map(function (target: Role) {
        return <div key={target.rolle} className='role'>{t(`target.role.${target.rolle}`)}</div>
    })

    return <div className='targets'>
        {targetList}
    </div>
}

export default Target