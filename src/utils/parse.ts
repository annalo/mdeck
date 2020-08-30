import { Marpit } from "@marp-team/marpit";
import TaskList from "markdown-it-task-lists";
import { injectLineNumber } from "utils/parsePlugins/injectLineNumber";

export const parse = (markdown: string): string => {
  const marpit = new Marpit({
    inlineSVG: true,
    markdown: { html: true, linkify: true, typographer: true },
  })
    .use(TaskList)
    .use(injectLineNumber);

  const { html }: { html: string } = marpit.render(markdown);
  return html;
};
