import Worker from "worker-loader!./Worker"; // eslint-disable-line
import type { Dispatch } from "react";
import type { MarkdownContextReducerAction } from "types/markdown-context";

export class MarkdownWorker {
  private readonly worker: Worker;

  constructor(dispatch: Dispatch<MarkdownContextReducerAction>) {
    this.worker = new Worker();
    this.worker.onmessage = ({
      data,
    }: {
      data: MarkdownContextReducerAction;
    }) => {
      console.log("markdown worker on message", data); // eslint-disable-line
      dispatch(data);
    };
  }

  parse(md: string): void {
    this.worker.postMessage({ action: "PARSE", md });
  }

  terminate(): void {
    if (this.worker) this.worker.terminate();
  }
}
