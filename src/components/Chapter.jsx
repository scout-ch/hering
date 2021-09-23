import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

class Chapter extends React.Component {
    constructor() {
        super();
        this.state = { markdown: '' };
    }

    componentWillMount() {
        fetch(this.props.markdown).then(res => res.text()).then(text => this.setState({ markdown: text }));
    }

    render() {
        return <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{this.state.markdown}</ReactMarkdown>
        </div>

    }
}

export default Chapter