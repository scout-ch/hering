import { useDocumentTitle } from "./DocumentTitleProvider";
import { useEffect } from "react";

export function DocumentTitle({ title }: { title: string | undefined }) {
    const { setPageTitle } = useDocumentTitle();

    useEffect(() => {
        setPageTitle(title);
        return () => setPageTitle(undefined);
    }, [title]);

    return null;
}