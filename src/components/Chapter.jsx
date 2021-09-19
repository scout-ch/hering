import React from 'react'

class Chapter extends React.Component {

    render() {
        const chapter = this.props.chapter
        const targets = chapter.targets.map((target) => target.toUpperCase()).join(', ')
        return <div>
            <h2>{chapter.title.de}</h2>
            <div className="targets">{targets}</div>
            <p>{chapter.intro.de}</p>
        </div>

    }
}

export default Chapter