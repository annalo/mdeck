import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import MarkdownItTaskLists from "markdown-it-task-lists";

function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}

export function parse(text: string): string {
  const parser = new MarkdownIt({
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(MarkdownItTaskLists);
  const result = parser.render(text);

  return sanitizeHTML(result);
}
