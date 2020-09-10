/**
 * Asynchronously loads the component for Slideshow
 */

import { loadable } from "utils/loadable";

export const Slideshow = loadable(
  () => import("./index"),
  (module) => module.Slideshow
);
