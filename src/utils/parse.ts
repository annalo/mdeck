import { Marpit } from "@marp-team/marpit";
import TaskList from "markdown-it-task-lists";
import { injectLineNumber } from "utils/parsePlugins/injectLineNumber";

function parse(markdown: MarkdownString): HtmlArray {
  const marpit = new Marpit({
    inlineSVG: true,
    markdown: { html: true, linkify: true, typographer: true },
  })
    .use(TaskList)
    .use(injectLineNumber);

  const { html }: { html: HtmlArray } = marpit.render(markdown, {
    htmlAsArray: true,
  });
  return html;
}

export { parse };
