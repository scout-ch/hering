import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { LinkComponent } from "../../helper/MarkdownComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";
import { type HApiPage } from "../../apis/hering-api";

type Props = {
    page: HApiPage
}

function HomePage(props: Props) {

    const startPage = props.page

    return <div className='content-main'>
        <h1>
            <FontAwesomeIcon icon={faFishFins}/> {startPage.title}
        </h1>
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={LinkComponent}>
            {startPage.content}
        </Markdown>
    </div>
}

export default HomePage