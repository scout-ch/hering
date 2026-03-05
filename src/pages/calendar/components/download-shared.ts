import { type CalendarTask } from "./CalendarForm";

export function buildLinks(task: CalendarTask, lang: string): string {
    return `${window.location.origin}/${lang}/${task.chapter.section.documentId}#${task.chapter.documentId}`
}