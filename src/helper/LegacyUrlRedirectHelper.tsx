import {useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom"

const LegacyUrlRedirectHelper = () => {
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.hash.startsWith('#/')) {
            return
        }

        const convertedUrl = location.hash
            .replace('#', '')
            .replace('%23', '#')
        console.info(`converted legacy URL from ${location.pathname}${location.hash} to ${convertedUrl}`)

        return navigate(convertedUrl);
    }, [location, navigate]);

    return null;
};

export default LegacyUrlRedirectHelper;