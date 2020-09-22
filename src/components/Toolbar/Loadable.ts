/**
 * Asynchronously loads the component for Toolbar
 */

import { loadable } from "utils/loadable";

const Toolbar = loadable(
  () => import("./index"),
  (module) => module.Toolbar
);

export { Toolbar };
