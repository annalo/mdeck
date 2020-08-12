/**
 *
 * Asynchronously loads the component for TextEditor
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TextEditor = lazyLoad(
  () => import('./index'),
  module => module.TextEditor,
);
