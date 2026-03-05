import { useEffect } from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"

const LegacyUrlRedirectHelper = () => {
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.hash.startsWith('#/')) {
            return
        }

        navigate({ to: '/' });
    }, [location, navigate]);

    return null;
};

export default LegacyUrlRedirectHelper;