/*
 *
 * A custom module for worker exports is required to integrated with Typescript:
 * https://webpack.js.org/loaders/worker-loader/#integrating-with-typescript
 *
 */
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}
