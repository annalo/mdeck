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

export function injectLineNumber(md: Record<string, any>) {
  const { marpitInlineSvgOpen } = md.renderer.rules;

  // Enable line sync by per slides
  // eslint-disable-next-line no-param-reassign
  md.renderer.rules.marpit_inline_svg_open = (tokens, idx, opts, env, self) => {
    const slide = tokens
      .slice(idx + 1)
      .find((t) => t.type === "marpit_slide_open");

    if (slide.map?.length) {
      tokens[idx].attrJoin("class", "src-line");
      tokens[idx].attrSet("data-line", slide.map[0]);
    }

    const renderer = marpitInlineSvgOpen || self.renderToken;
    return renderer.call(self, tokens, idx, opts, env, self);
  };

  // Enables line sync per elements
  RULES.forEach((rule) => {
    const original = md.renderer.rules[rule];
    // eslint-disable-next-line no-param-reassign
    md.renderer.rules[rule] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];

      if (token.map?.length) {
        token.attrJoin("class", "code-line");
        token.attrSet("data-line", token.map[0]);
      }

      const renderer = original || self.renderToken;
      return renderer.call(self, tokens, idx, options, env, self);
    };
  });
}
