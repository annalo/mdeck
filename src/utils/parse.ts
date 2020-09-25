import { Marpit } from "@marp-team/marpit";
import highlightjs from "highlight.js";
import TaskList from "markdown-it-task-lists";
import { injectLineNumber } from "utils/parsePlugins/injectLineNumber";

function highlighter(code: string, lang: string): string {
  if (lang) {
    return highlightjs.getLanguage(lang)
      ? highlightjs.highlight(lang, code, true).value
      : "";
  }
  return highlightjs.highlightAuto(code).value;
}

function parse(markdown: MarkdownString): HtmlArray {
  const marpit = new Marpit({
    inlineSVG: true,
    markdown: {
      breaks: true,
      highlight: (code, lang) => highlighter(code, lang),
      html: true,
      linkify: true,
      typographer: true,
    },
  })
    .use(TaskList)
    .use(injectLineNumber);

  const { html }: { html: HtmlArray } = marpit.render(markdown, {
    htmlAsArray: true,
  });
  return html;
}

export { parse };
