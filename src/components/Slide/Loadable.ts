/**
 * Asynchronously loads the component for Slide
 */

import { loadable } from "utils/loadable";

export const Slide = loadable(
  () => import("./index"),
  (module) => module.Slide
);
