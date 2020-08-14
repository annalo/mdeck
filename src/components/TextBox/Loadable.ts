/**
 *
 * Asynchronously loads the component for TextBox
 *
 */

import { lazyLoad } from "utils/loadable";

export const TextBox = lazyLoad(
  () => import("./index"),
  (module) => module.TextBox
);
