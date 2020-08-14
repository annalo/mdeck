/**
 *
 * Asynchronously loads the component for Slide
 *
 */

import { lazyLoad } from "utils/loadable";

export const Slide = lazyLoad(
  () => import("./index"),
  (module) => module.Slide
);
