import { CalendarTask } from "./Task";
import { HApiChapter } from "../../../apis/hering-api";

export function buildLinks(task: CalendarTask): string {
    return task.chapters
        .map((chapter: HApiChapter) => 'https://scout-ch.github.io/hering/' + chapter.slug_with_section)
        .join(', ')
}