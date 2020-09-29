/**
 * Asynchronously loads the component for Editor
 */

import { loadable } from "utils/loadable";

const Editor = loadable(() =>
  import("./index").then((module) => ({ default: module.Editor }))
);

export { Editor };
