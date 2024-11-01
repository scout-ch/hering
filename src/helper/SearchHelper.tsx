export class SearchHelper {
    static matches(keywords: string, ...values: any[]) {
        if (!keywords) {
            return true;
        } else {
            const keywordValues = [] as any[];
            const terms = keywords.split(' ').filter(t => t.length > 0);

            values.forEach(v => {
                this.extractKeywordValues(v, keywordValues);
            });

            return terms.every(term => {
                return keywordValues.some(value => this.contains(value, term));
            });
        }
    }

    static matchesExact(keywords: string, ...values: any[]) {
        if (!keywords) {
            return true;
        } else {
            const keywordValues = [] as any[];

            values.forEach(v => {
                this.extractKeywordValues(v, keywordValues);
            });

            return keywordValues.some(value => this.contains(value, keywords));
        }
    }

    private static extractKeywordValues(value: any, keywordValues: any[]) {
        if (value instanceof Object) {
            Object.keys(value).forEach(key => {
                this.extractKeywordValues(value[key], keywordValues);
            });
        } else if (value !== undefined && value !== null) {
            keywordValues.push(value);
        }
    }

    private static contains(value: any, term: string) {
        const str = (value || '').toString() as string;

        return this.normalize(str).includes(this.normalize(term));
    }

    private static normalize(value: string) {
        return value.toLowerCase()
            .replace(/[éèë]/g, 'e')
            .replace(/[àáäã]/g, 'a')
            .replace(/[òóöõ]/g, 'o')
            .replace(/[ü]/g, 'u');
    }
}