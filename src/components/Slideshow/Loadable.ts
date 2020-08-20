/**
 *
 * Asynchronously loads the component for Slideshow
 *
 */

import { lazyLoad } from "utils/loadable";

export const Slideshow = lazyLoad(() => import("./index"));
