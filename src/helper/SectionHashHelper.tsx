import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const ScrollToHashElement = () => {
    const location = useLocation();

    useEffect(() => {
        const getHashElement = () => {
            if (location.hash) {
                const id = location.hash.replace('#', '');
                return document.getElementById(id);
            }

            return document.getElementById('section-title')
        }

        const hashElement = getHashElement();
        if (!hashElement) {
            return;
        }

        hashElement.scrollIntoView({
            behavior: "instant",
            block: 'start'
        });
    }, [location]);

    return null;
};

export default ScrollToHashElement;