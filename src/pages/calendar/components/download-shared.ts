import { CalendarTask } from "./CalendarForm";
import { HERING_BASE_URL } from "../../../shared/constants";

export function buildLinks(task: CalendarTask): string {
    return `${HERING_BASE_URL}/#/${task.chapter.section.documentId}#${task.chapter.documentId}`
}