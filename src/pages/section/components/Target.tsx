import React from 'react'
import { HApiRole } from "../../../apis/hering-api";

type Props = {
    targets: HApiRole[]
}

export default function Target(props: Props) {
    return <div className='targets'>
        {props.targets.map((target: HApiRole) =>
            <div key={target.documentId}
                 className='role'>{target.name}</div>)}
    </div>
}