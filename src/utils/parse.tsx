import { Marpit } from "@marp-team/marpit";
import TaskList from "markdown-it-task-lists";

export function parse(markdown: string): string[] {
  const marpit = new Marpit({
    markdown: { breaks: true, linkify: true, typographer: true },
  }).use(TaskList);

  const { html = [] }: { html: string[] } = marpit.render(markdown, {
    htmlAsArray: true,
  });
  return html;
}
