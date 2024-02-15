import {TaskT} from "./Task";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ChapterT} from "../../section/components/Chapter";
import {format} from "date-fns";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";

type Props = {
    tasks: TaskT[]
    calendarTitlePrefix: string
}

function buildLinks(task: TaskT): string {
    return task.chapters
        .map((chapter: ChapterT) => 'https://scout-ch.github.io/hering/' + chapter.slug_with_section)
        .join(', ')
}

function CsvDownload(props: Props) {

    const {t} = useTranslation();
    const [downloadLink, setDownloadLink] = useState<string>();

    useEffect(() => {
        const generateCsv = (tasks: TaskT[]): string => {
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

            const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
            return URL.createObjectURL(blob);
        }

        const prepareDownloadLink = () => {
            if (!props.tasks || props.tasks.length === 0) {
                setDownloadLink('')
                return
            }

            const downloadLink = generateCsv(props.tasks);
            setDownloadLink(downloadLink)
        }

        prepareDownloadLink()
    }, [props.tasks, props.calendarTitlePrefix, t]);


    if (!downloadLink || downloadLink.length === 0) {
        return <div></div>
    }

    const spacedCalendarPrefix = (props.calendarTitlePrefix ?? '').length > 0
        ? props.calendarTitlePrefix + ' '
        : ''

    return (
        <a className="download-btn" id="csv-download"
           download={t('calendarPage.csv.filename', {calendarTitlePrefix: spacedCalendarPrefix})}
           href={downloadLink}>
            <FontAwesomeIcon icon={faFileCsv}/>
            {t('calendarPage.csv.download')}
        </a>
    );
}

export default CsvDownload