/**
 * Asynchronously loads the component for Slide
 */

import { loadable } from "utils/loadable";

const Slide = loadable(() =>
  import("./index").then((module) => ({ default: module.Slide }))
);

export { Slide };
