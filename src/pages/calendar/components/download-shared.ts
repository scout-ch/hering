import { type CalendarTask } from "./CalendarForm";

export function buildLinks(task: CalendarTask): string {
    return `${window.location.origin}/#/${task.chapter.section.documentId}#${task.chapter.documentId}`
}