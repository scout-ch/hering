type SearchableValue = string | number | boolean | null | undefined | object;

export class SearchHelper {
    /**
     * Checks if all space-separated terms in `keywords` are found in any of the values.
     * Uses substring matching with case-insensitive and diacritic-insensitive comparison.
     */
    static matches(keywords: string, ...values: SearchableValue[]): boolean {
        if (!keywords) {
            return true;
        }

        const terms = keywords.split(' ').filter(t => t.length > 0);
        if (terms.length === 0) {
            return true;
        }

        // Normalize terms once upfront
        const normalizedTerms = terms.map(t => this.normalize(t));

        // Extract and normalize all searchable values
        const normalizedValues: string[] = [];
        for (const v of values) {
            this.extractAndNormalizeValues(v, normalizedValues);
        }

        // Every term must be found in at least one value
        return normalizedTerms.every(term =>
            normalizedValues.some(value => value.includes(term))
        );
    }

    /**
     * Checks if the exact keyword string is found in any of the values (no term splitting).
     */
    static matchesExact(keywords: string, ...values: SearchableValue[]): boolean {
        if (!keywords) {
            return true;
        }

        const normalizedKeyword = this.normalize(keywords);
        const normalizedValues: string[] = [];
        for (const v of values) {
            this.extractAndNormalizeValues(v, normalizedValues);
        }

        return normalizedValues.some(value => value.includes(normalizedKeyword));
    }

    private static extractAndNormalizeValues(value: SearchableValue, result: string[]): void {
        if (value === null || value === undefined) {
            return;
        }

        if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
                this.extractAndNormalizeValues((value as Record<string, SearchableValue>)[key], result);
            }
        } else {
            result.push(this.normalize(String(value)));
        }
    }

    /**
     * Normalizes a string: lowercase + removes all diacritics.
     * Uses Unicode NFD normalization to handle all diacritical marks.
     */
    private static normalize(value: string): string {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
}