/* eslint-disable */
import { Marpit } from "@marp-team/marpit";
import TaskList from "markdown-it-task-lists";

const RULES = [
  "blockquote_open",
  "code_block",
  "fence",
  "heading_open",
  "image",
  "list_item_open",
  "paragraph_open",
  // "table_open",
];

function injectLineNumber(md: any) {
  // Enables line sync per elements
  RULES.forEach((rule) => {
    const original = md.renderer.rules[rule];
    md.renderer.rules[rule] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];

      if (token.map?.length) {
        token.attrJoin("class", "src-line");
        token.attrSet("data-src-line", token.map[0]);
      }

      const renderer = original || self.renderToken;
      return renderer.call(self, tokens, idx, options, env, self);
    };
  });
}

export function parse(markdown: string): string[] {
  const marpit = new Marpit({
    markdown: { html: true, linkify: true, typographer: true },
  })
    .use(TaskList)
    .use(injectLineNumber);

  const { html = [] }: { html: string[] } = marpit.render(markdown, {
    htmlAsArray: true,
  });
  return html;
}
