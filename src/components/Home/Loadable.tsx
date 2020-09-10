/**
 * Asynchronously loads the component for Home
 */

import { loadable } from "utils/loadable";

const Home = loadable(
  () => import("./index"),
  (module) => module.Home
);

export { Home };
