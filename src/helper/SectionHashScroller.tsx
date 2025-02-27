import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { CHAPTER_NAV_UPDATED_EVENT } from "../shared/constants";

const SectionHashScroller = () => {

    const location = useLocation();

    useEffect(() => {
        const scrollToHashElement = () => {
            // Ensure as much as possible that the content is rendered and the hash position is correct
            requestAnimationFrame(() => setTimeout(() => {
                const getHashElement = () => {
                    const locationHash = !!location.hash
                        ? location.hash
                        : decodeURIComponent(location.pathname);

                    if (!locationHash || locationHash.indexOf('#') === -1) {
                        return null;
                    }

                    const id = locationHash.slice(locationHash.indexOf('#') + 1);
                    return document.getElementById(id);
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

                window.dispatchEvent(new CustomEvent(CHAPTER_NAV_UPDATED_EVENT, {
                    detail: {
                        chapterId: hashElement.id
                    }
                }))
            }, 50));
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

        scrollToHashElement()

        return () => {
            mutationObserver.disconnect()
        }
    }, [location.pathname, location.hash]);

    return null;
};

export default SectionHashScroller;