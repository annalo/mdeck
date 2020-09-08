import Worker from "worker-loader!./Worker"; // eslint-disable-line

import type { Dispatch } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context";

import { MarkdownContextReducerActionType } from "types/markdown-context";

export default class MarkdownParserWorker {
  private readonly worker: Worker;

  constructor(dispatch: Dispatch<MarkdownContextReducerAction>) {
    this.worker = new Worker();
    this.worker.onmessage = ({ data }: { data: HtmlArray }) =>
      dispatch({
        type: MarkdownContextReducerActionType.SetHtmlArray,
        htmlArray: data,
      });
  }

  parse(md: MarkdownString): void {
    this.worker.postMessage(md);
  }

  terminate(): void {
    if (this.worker) this.worker.terminate();
  }
}
