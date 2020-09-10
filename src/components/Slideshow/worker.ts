import { parse } from "utils/parse";

const ctx: Worker = self as any; // eslint-disable-line
console.log("Start worker thread, wait for postMessage: "); // eslint-disable-line

ctx.onmessage = ({ data }) => {
  // @ts-ignore https://github.com/Microsoft/TypeScript/issues/24239
  postMessage(parse(data));
};
