import Worker from "worker-loader!./Worker"; // eslint-disable-line

export class MarkdownWorker {
  private readonly worker: Worker;

  constructor() {
    this.worker = new Worker();
    this.worker.onmessage = ({ data }) => {
      console.log("MarkdownWorker instance", data);
    };
  }

  postMessage(data) {
    this.worker.postMessage(data);
  }

  parse(md) {
    this.worker.postMessage({ action: "PARSE", md });
  }
}
