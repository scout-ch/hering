import { TaskT } from "./Task";
import { ChapterT } from "../../section/components/Chapter";
import * as ics from "ics";
import { EventAttributes } from "ics";
import { saveAs } from "../../../helper/FileHelper";
import { buildLinks } from "./download-shared";

export async function downloadAsIcs(tasks: TaskT[], calendarTitlePrefix: string, filename: string) {
    const events = tasks.map(function (task) {
        const deadline = task.deadline
        const alarms = []

        alarms.push({
            action: 'display',
            description: buildDescription(task),
            trigger: { hours: 1, before: true },
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
        } as EventAttributes
    })

    const calendarValue = await new Promise<any>((resolve, reject) => {
        ics.createEvents(events, (error: any, value: any) => {
            if (error) {
                reject(error)
                return
            }

            if (!value) {
                reject('invalid ics value')
                return
            }

            resolve(value)
        })
    })

    const data = new Blob([calendarValue], { type: 'text/calendar' });
    const downloadUrl = URL.createObjectURL(data);

    saveAs(downloadUrl, filename)
    URL.revokeObjectURL(downloadUrl);
}

function buildDescription(task: TaskT): string {
    return task.chapters
        .map((chapter: ChapterT) => chapter.slug_with_section)
        .join(',')
}