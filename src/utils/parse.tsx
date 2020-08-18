/* eslint-disable */
import { Marpit } from "@marp-team/marpit";
import TaskList from "markdown-it-task-lists";

const RULES = [
  "blockquote_open",
  "code_block",
  "fence",
  "heading_open",
  "image",
  "link_open",
  "list_item_open",
  "paragraph_open",
  "table_open",
];

function injectLineNumber(md: any) {
  const { marpit_inline_svg_open } = md.renderer.rules;

  // Enable line sync by per slides
  md.renderer.rules.marpit_inline_svg_open = (tokens, idx, opts, env, self) => {
    const slide = tokens
      .slice(idx + 1)
      .find((t) => t.type === "marpit_slide_open");

    if (slide.map?.length) {
      tokens[idx].attrJoin("class", "src-line");
      tokens[idx].attrSet("data-line", slide.map[0]);
    }

    const renderer = marpit_inline_svg_open || self.renderToken;
    return renderer.call(self, tokens, idx, opts, env, self);
  };

  // Enables line sync per elements
  for (const rule of RULES) {
    const original = md.renderer.rules[rule];

    md.renderer.rules[rule] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];

      if (token.map?.length) {
        token.attrJoin("class", "code-line");
        token.attrSet("data-line", token.map[0]);
      }

      const renderer = original || self.renderToken;
      return renderer.call(self, tokens, idx, options, env, self);
    };
  }
}

export function parse(markdown: string): string {
  const marpit = new Marpit({
    inlineSVG: true,
    markdown: { html: true, linkify: true, typographer: true },
  })
    .use(TaskList)
    .use(injectLineNumber);

  const { html }: { html: string } = marpit.render(markdown);
  return html;
}
