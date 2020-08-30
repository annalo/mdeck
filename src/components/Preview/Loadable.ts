/**
 *
 * Asynchronously loads the component for Preview
 *
 */

import { lazyLoad } from "utils/loadable";

export const Preview = lazyLoad(() => import("./index"));
