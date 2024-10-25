import { TaskT } from "./Task";
import { ChapterT } from "../../section/components/Chapter";

export function buildLinks(task: TaskT): string {
    return task.chapters
        .map((chapter: ChapterT) => 'https://scout-ch.github.io/hering/' + chapter.slug_with_section)
        .join(', ')
}