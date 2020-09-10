/**
 * Asynchronously loads the component for Slide
 */

import { loadable } from "utils/loadable";

const Slide = loadable(
  () => import("./index"),
  (module) => module.Slide
);

export { Slide };
