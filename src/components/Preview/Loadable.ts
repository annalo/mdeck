/**
 * Asynchronously loads the component for Preview
 */

import { loadable } from "utils/loadable";

const Preview = loadable(() =>
  import("./index").then((module) => ({ default: module.Preview }))
);

export { Preview };
