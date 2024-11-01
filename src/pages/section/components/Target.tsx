import React from 'react'
import { useTranslation } from 'react-i18next'
import { HApiRole } from "../../../apis/hering-api";

type Props = {
    targets: HApiRole[]
}

export default function Target(props: Props) {

    const { t } = useTranslation()

    const targetList = props.targets.map(function (target: HApiRole) {
        return <div key={target.rolle} className='role'>{t(`target.role.${target.rolle}`)}</div>
    })

    return <div className='targets'>
        {targetList}
    </div>
}