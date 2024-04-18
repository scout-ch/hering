import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToHashElement = () => {

    const location = useLocation();

    useEffect(() => {
        const scrollToHashElement = () => {
            const getHashElement = () => {
                if (location.hash) {
                    const id = location.hash.replace('#', '');
                    return document.getElementById(id);
                }

                return document.getElementById('section-title')
            }

            const hashElement = getHashElement();
            if (!hashElement) {
                window.scrollTo(0, 0)
                return;
            }

            hashElement.scrollIntoView({
                behavior: "instant",
                block: 'start'
            });
        }

        // wait for section to be loaded into the DOM
        const mutationObserver = new MutationObserver((records) => {
            records.forEach(record => {
                if (record.type !== 'childList'
                    || record.target.nodeType !== record.target.ELEMENT_NODE
                    || record.addedNodes.length === 0) {
                    return
                }

                const element = record.target as HTMLElement
                if (element.id !== 'main') {
                    return
                }

                const isSectionAdded = Array.from(record.addedNodes)
                    .filter(n => n.nodeType === n.ELEMENT_NODE)
                    .map(n => n as HTMLElement)
                    .some(e => e.id === 'section')

                // only scroll to hash location if section view is loaded into the DOM
                if (!isSectionAdded) {
                    return
                }

                scrollToHashElement()
            })
        });

        const mainElement = document.getElementById('main')
        mutationObserver.observe(mainElement!, { attributes: false, childList: true, subtree: true });

        scrollToHashElement();

        return () => {
            mutationObserver.disconnect()
        }
    }, [location.hash]);

    return null;
};

export default ScrollToHashElement;