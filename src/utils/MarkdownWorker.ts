export const workerThreadCodeFn = () => {
  // START OF WORKER THREAD CODE
  console.log("Start worker thread, wait for postMessage: ");

  onmessage = (e) => {
    console.log("worker thread onmessage", e);
    // @ts-ignore https://github.com/Microsoft/TypeScript/issues/24239
    postMessage(e.data);
  };
  // END OF WORKER THREAD CODE
};

const handleMessage = (e) => {
  console.log("MarkdownWorker instance", e);
};

export class MarkdownWorker {
  private readonly worker: Worker;

  constructor() {
    const blob = workerThreadCodeFn
      .toString()
      .replace(/^[^{]*{\s*/, "")
      .replace(/\s*}[^}]*$/, "");

    this.worker = new Worker(
      URL.createObjectURL(new Blob([blob], { type: "text/javascript" }))
    );
    this.worker.onmessage = (e) => {
      console.log("MarkdownWorker instance", e);
    };
  }

  postMessage(data) {
    this.worker.postMessage(data);
  }
}
