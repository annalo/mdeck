import { Marpit } from "@marp-team/marpit";

export function convertMarkdown(markdown: string): string {
  const marpit = new Marpit();
  const { html } = marpit.render(markdown);
  return html;
}
