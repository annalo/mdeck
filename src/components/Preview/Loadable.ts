/**
 * Asynchronously loads the component for Preview
 */

import { loadable } from "utils/loadable";

const Preview = loadable(
  () => import("./index"),
  (module) => module.Preview
);

export { Preview };
