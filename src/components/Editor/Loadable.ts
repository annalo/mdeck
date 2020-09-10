/**
 * Asynchronously loads the component for Editor
 */

import { loadable } from "utils/loadable";

const Editor = loadable(
  () => import("./index"),
  (module) => module.Editor
);

export { Editor };
