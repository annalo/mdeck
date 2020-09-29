/**
 * Asynchronously loads the component for Toolbar
 */

import { loadable } from "utils/loadable";

const Toolbar = loadable(() =>
  import("./index").then((module) => ({ default: module.Toolbar }))
);

export { Toolbar };
