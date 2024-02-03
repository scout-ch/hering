import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import {withTranslation} from 'react-i18next'
import {TaskT} from './Task'
import {ChapterT} from './Chapter';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const A = styled.a`
    border: none;
    color: white;
    background: var(--color-primary-light);
    padding: 0.3em;
    border-radius: 4px;

    &:hover {
        color: white;
        opacity: 0.5;
    }
`

type Props = {
    t: any
    tasks: Array<TaskT>
    calendarTitlePrefix: string
}

function buildDescription(task: TaskT): string {
    return task.chapters
        .map((chapter: ChapterT) => chapter.slug_with_section)
        .join(',')
}

function buildLinks(task: TaskT): string {
    return task.chapters
        .map((chapter: ChapterT) => 'https://scout-ch.github.io/hering/' + chapter.slug_with_section)
        .join(',')
}

async function generateIcsLink(tasks: TaskT[], calendarTitlePrefix: string): Promise<string> {
    const ics = require('ics')

    const events = tasks.map(function (task) {
        const deadline = task.deadline
        const alarms = []

        alarms.push({
            action: 'display',
            description: buildDescription(task),
            trigger: {hours: 1, before: true},
        })

        return {
            start: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
            end: [deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate()],
            title: `${calendarTitlePrefix} ${task.title}`,
            description: buildLinks(task),
            url: buildLinks(task),
            status: 'CONFIRMED',
            busyStatus: 'FREE',
            alarms: alarms
        }
    })

    return new Promise((resolve, reject) => {
        ics.createEvents(events, (error: any, value: any) => {
            if (error) {
                reject(error)
                return
            }

            if (!value) {
                reject('invalid ics value')
                return
            }

            const data = new Blob([value], {type: 'text/calendar'});
            const link = window.URL.createObjectURL(data);
            resolve(link)
        })
    })
}

function IcsDownload(props: Props) {

    const [downloadLink, setDownloadLink] = useState<string>();

    useEffect(() => {
        const prepareDownloadLink = async () => {
            if (!props.tasks || props.tasks.length === 0) {
                setDownloadLink('')
                return
            }

            const downloadLink = await generateIcsLink(props.tasks, props.calendarTitlePrefix);
            setDownloadLink(downloadLink)
        }

        prepareDownloadLink()
    }, [props.tasks, props.calendarTitlePrefix]);


    if (!downloadLink || downloadLink.length === 0) {
        return <div></div>
    }

    const {t} = props;
    return (
        <div className='calendar-ics'>
            <A className="ics_download" id="link"
               download={t('calendarPage.ics.filename')}
               href={downloadLink}>
                <i><FontAwesomeIcon icon="calendar"/> </i>
                {t('calendarPage.ics.download')}
            </A>
        </div>
    );
}

export default withTranslation()(IcsDownload)