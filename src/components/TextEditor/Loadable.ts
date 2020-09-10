/**
 * Asynchronously loads the component for TextEditor
 */

import { loadable } from "utils/loadable";

export const TextEditor = loadable(
  () => import("./index"),
  (module) => module.TextEditor
);
