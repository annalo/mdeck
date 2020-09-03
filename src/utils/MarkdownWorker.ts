import Worker from "worker-loader!./Worker"; // eslint-disable-line
import type { Dispatch } from "react";
import type { MarkdownContextReducerActionType } from "types/markdown-context";

export class MarkdownWorker {
  private readonly worker: Worker;

  constructor(dispatch: Dispatch<MarkdownContextReducerActionType>) {
    this.worker = new Worker();
    this.worker.onmessage = ({ data }) => dispatch(data);
  }

  postMessage(data) {
    this.worker.postMessage(data);
  }

  parse(md) {
    this.worker.postMessage({ action: "PARSE", md });
  }

  render(htmlString) {
    this.worker.postMessage({ action: "RENDER", htmlString });
  }

  terminate() {
    if (this.worker) this.worker.terminate();
  }
}
