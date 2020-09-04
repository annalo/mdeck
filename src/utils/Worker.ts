import { MarkdownContextReducerActionType } from "types/markdown-context";
import { parse } from "./parse";

const ctx: Worker = self as any; // eslint-disable-line
console.log("Start worker thread, wait for postMessage: "); // eslint-disable-line

ctx.onmessage = ({ data }) => {
  const { action, md } = data;
  // TODO do heavy parsing and rendering
  switch (action) {
    case "PARSE":
      // @ts-ignore https://github.com/Microsoft/TypeScript/issues/24239
      postMessage({
        type: MarkdownContextReducerActionType.SetHtmlString,
        htmlString: parse(md),
      });
      break;

    default:
      throw new Error();
  }
};
