import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const LegacyUrlRedirectHelper = () => {
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.hash.startsWith('#/')) {
            return
        }

        return navigate('/');
    }, [location, navigate]);

    return null;
};

export default LegacyUrlRedirectHelper;