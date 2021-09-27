import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

class Chapter extends React.Component {
    render() {
        const data = this.props.data
        if (!data) {
            return null
        }
        const targets = data['responsible'].map((target) => target['label'].toUpperCase()).join(', ')

        return <div>
            <div className="targets">{targets}</div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
        </div>
    }
}

export default Chapter