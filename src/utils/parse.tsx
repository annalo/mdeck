import { Marpit } from "@marp-team/marpit";

export function parse(markdown: string): string[] {
  const marpit = new Marpit({
    markdown: { breaks: true, linkify: true, typographer: true },
  });

  const { html = [] }: { html: string[] } = marpit.render(markdown, {
    htmlAsArray: true,
  });
  return html;
}
