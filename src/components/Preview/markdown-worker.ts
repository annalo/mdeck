import Worker from "worker-loader!./worker"; // eslint-disable-line

import type { Dispatch } from "react";
import {
  MarkdownContextReducerAction,
  MarkdownContextReducerActionType,
} from "types/markdown-context-reducer-action";

export default class MarkdownWorker {
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
