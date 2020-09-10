/**
 * Asynchronously loads the component for TextEditor
 */

import { loadable } from "utils/loadable";

const TextEditor = loadable(
  () => import("./index"),
  (module) => module.TextEditor
);

export { TextEditor };
