import { CalendarTask } from "./Task";
import { format } from "date-fns";
import { saveAs } from "../../../helper/FileHelper";
import i18n from "i18next";
import { buildLinks } from "./download-shared";

const t = i18n.t

export function downloadAsCsv(tasks: CalendarTask[], filename: string) {
    if (tasks.length === 0) {
        return
    }

    // Headers
    let csvContent = `${t('calendarPage.table.when')},${t('calendarPage.table.what')},${t('calendarPage.table.who')},${t('calendarPage.table.target')},${t('calendarPage.table.chapters')}\n`;

    tasks.forEach(task => {
        const responsible = task.responsible
            .map(responsible => t(`target.role.${responsible['rolle']}`))
            .join(', ')
        const targets = task.targets
            .map(target => target['rolle'])
            .join(', ')

        const row = [
            format(task.deadline, 'yyyy-MM-dd'),
            `"${task.title}"`,
            `"${responsible}"`,
            `"${targets}"`,
            `"${buildLinks(task)}"`
        ].join(',');

        csvContent += row + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);

    saveAs(downloadUrl, filename)
    URL.revokeObjectURL(downloadUrl);
}

