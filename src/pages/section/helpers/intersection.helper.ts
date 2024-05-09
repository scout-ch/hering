import { CHAPTER_NAV_UPDATED_EVENT } from "../../../shared/constants";

export function handleIntersectionChanged(entries: IntersectionObserverEntry[], locationHash: string) {
    if (entries.length === 0) {
        return;
    }

    if (entries.length > 1) {
        // Multiple entries in one batch are mostly observed if the navigation originated
        // from a Route event. If this is the case, we check if a hash route is actually set.
        // If the navigation originated by a hash route, we don't want to overwrite the selected slug.
        if (locationHash.length > 0) {
            return
        }

        // If there was no hash route selected, we select the first intersecting element that is observed.
        // This mainly happends if a section is directly selected in the menu without selecting a chapter.
        const intersectingElement = entries.find(e => e.isIntersecting)
        if (!intersectingElement) {
            return
        }

        window.dispatchEvent(new CustomEvent(CHAPTER_NAV_UPDATED_EVENT, {
            detail: {
                chapterSlug: intersectingElement.target.children[0].id
            }
        }))

        return
    }

    entries.forEach(entry => {
        const topRatio = entry.intersectionRect.top / entry.rootBounds!.height;
        if (topRatio > 0.1) {
            // If the element is too far away from the top, we ignore it.
            return;
        }

        // isInterceting && topRatio <= 0.1 --> target element is active
        // !isInterceting && topRatio <= 0.1 --> target next sibling (element) is active
        const chapterSlug = entry.isIntersecting
            ? entry.target.children[0].id
            : entry.target.nextElementSibling?.children[0].id
        if (!chapterSlug) {
            return;
        }

        window.dispatchEvent(new CustomEvent(CHAPTER_NAV_UPDATED_EVENT, {
            detail: {
                chapterSlug: chapterSlug
            }
        }))
    });
}