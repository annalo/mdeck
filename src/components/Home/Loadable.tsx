/**
 * Asynchronously loads the component for Home
 */

import { loadable } from "utils/loadable";

const Home = loadable(() =>
  import("./index").then((module) => ({ default: module.Home }))
);

export { Home };
