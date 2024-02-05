import React from 'react'

type Props = {
    isLoading: boolean
}

function Loading(probs: Props) {
    if (probs.isLoading) {
        return <div className='loading-container'>
            <div className='loading-spinner'></div>
        </div>
    }

    return <></>
}

export default Loading