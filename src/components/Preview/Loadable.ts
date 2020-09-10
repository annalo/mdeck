/**
 * Asynchronously loads the component for Preview
 */

import { loadable } from "utils/loadable";

export const Preview = loadable(
  () => import("./index"),
  (module) => module.Preview
);
