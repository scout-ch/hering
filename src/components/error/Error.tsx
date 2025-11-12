import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import './error.less'

type Props = {
    error: Error
}

export default function Error(props: Props) {
    return <div className="error">
        <FontAwesomeIcon icon={faBug} size="2x"/>
        <div>Es gab einen unerwarteten Fehler. Bitte versuche es später erneut.</div>
        <hr/>
        <div className="message">
            {props.error.message}
        </div>
    </div>
}