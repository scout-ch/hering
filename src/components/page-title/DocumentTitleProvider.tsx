import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState, } from 'react';

export type DocumentTitleConfig = { baseTitle: string; separator: string };

type Ctx = DocumentTitleConfig & {
    setBaseTitle: (b: string) => void;
    setSeparator: (s: string) => void;
    setPageTitle: (t: string | undefined) => void;
};

const defaultCtx: Ctx = {
    baseTitle: '',
    separator: ' - ',
    setBaseTitle: () => {},
    setSeparator: () => {},
    setPageTitle: () => {},
};

export const DocumentTitleContext = createContext<Ctx>(defaultCtx);

type ProviderProps = PropsWithChildren<Partial<DocumentTitleConfig>>;

export function DocumentTitleProvider({ baseTitle: baseProp = '', separator: sepProp = ' - ', children }: ProviderProps) {
    const [baseTitle, setBaseTitle] = useState(baseProp);
    const [separator, setSeparator] = useState(sepProp);
    const [pageTitle, setPageTitle] = useState<string | undefined>(undefined);

    useEffect(() => {
        setBaseTitle((baseProp || '').trim())
    }, [baseProp]);
    useEffect(() => setSeparator(sepProp), [sepProp]);

    useEffect(() => {
        const makeTitle = () => {
            if (!pageTitle || pageTitle.length === 0) {
                return baseTitle;
            }

            const cleanPageTitle = pageTitle.trim();
            if (cleanPageTitle === baseTitle) {
                return baseTitle;
            }

            return `${cleanPageTitle}${separator}${baseTitle}`
        };

        document.title = makeTitle();
    }, [pageTitle, baseTitle, separator]);

    const value = useMemo(
        () => ({ baseTitle, setBaseTitle, separator, setSeparator, pageTitle, setPageTitle }),
        [baseTitle, separator, pageTitle]
    );

    return <DocumentTitleContext.Provider value={value}>{children}</DocumentTitleContext.Provider>;
}

export function useDocumentTitle() {
    return useContext(DocumentTitleContext);
}