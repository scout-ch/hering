import { loadPublicHolidays, loadSchoolHolidays, loadSubdivisions, type OHApiLanguageCode, parseLanguageOrDefault } from "../../../apis/openholidays-api";
import { i18n } from "../../../i18n";

class SwissHolidaysProvider {

    private relevantPublicHolidayNames: string[] = ['Ascension Day', 'Easter Monday', 'Pentecost Monday'];
    private readonly apiLanguage: OHApiLanguageCode

    constructor(lang: string) {
        this.apiLanguage = parseLanguageOrDefault(lang);
    }

    public async loadCantons(): Promise<Canton[]> {
        const subdivisions = await loadSubdivisions()

        return subdivisions.map(subdivision => {
            return {
                code: subdivision.code,
                shortName: subdivision.shortName,
                name: subdivision.name.find(name => name.language === this.apiLanguage)?.text
            } as Canton
        })
    }

    public async loadHolidays(year: number, canton?: Canton | null) {
        const from = new Date(year, 0, 1)
        const to = new Date(year, 11, 31)

        let publicHolidays = (await loadPublicHolidays(from, to))
            .filter(h => this.relevantPublicHolidayNames.includes(h.name.find(name => name.language === 'EN')?.text ?? ''));
        let schoolHolidays = await loadSchoolHolidays(from, to)

        if (canton) {
            publicHolidays = publicHolidays.filter(h => h.nationwide || h.subdivisions?.some(s => s.code === canton.code));
            schoolHolidays = schoolHolidays.filter(h => h.subdivisions?.some(s => s.code === canton.code));
        }

        return publicHolidays
            .concat(schoolHolidays)
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .map(h => {
                const comments = h.comment ?? [];
                const commentsInSelectedLanguage = comments.filter(c => c.language == this.apiLanguage);
                // If there are no comments in the selected language, use all available comments as they might still
                // contain useful information and can be translated by the user
                const relevantComments = commentsInSelectedLanguage.length > 0
                    ? commentsInSelectedLanguage
                    : comments;

                return {
                    id: h.id,
                    name: h.name.find(name => name.language === this.apiLanguage)?.text ?? h.name[0].text ?? 'unknown',
                    startDate: h.startDate,
                    endDate: h.endDate,
                    comment: relevantComments.map(c => c.text).join(', ')
                } as Holiday;
            });
    }
}

export const swissHolidaysProvider = new SwissHolidaysProvider(i18n.language);

export interface Canton {
    code: string;
    shortName: string;
    name: string;
}

export interface Holiday {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    comment: string;
}