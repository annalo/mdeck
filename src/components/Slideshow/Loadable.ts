/**
 * Asynchronously loads the component for Slideshow
 */

import { loadable } from "utils/loadable";

const Slideshow = loadable(
  () => import("./index"),
  (module) => module.Slideshow
);

export { Slideshow };
