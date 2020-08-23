import React, { useContext, useRef, useEffect } from "react";

import { MarkdownContext } from "contexts/MarkdownContext";
import { useSlideshowScrollTop } from "components/Slideshow/useSlideshowScrollTop";

interface Props {
  children: React.ReactElement;
  attributes: { [key: string]: string };
  elementTag: string;
  srcLine: number;
}

export function SlideElement({
  attributes,
  children,
  elementTag,
  srcLine,
}: Props): React.ReactElement {
  const ref = useRef<SVGSVGElement>(null);
  const { dispatch } = useContext(MarkdownContext);
  const [slideshowScrollTop] = useSlideshowScrollTop();

  // move this logic into reusable hook so Slide component can use it too
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* if element is within 18px of the top of the viewport */
    /* set previewLineNumber to srcLine  */
    const boundingClientRectTop = node.getBoundingClientRect().top;
    if (boundingClientRectTop <= 18) {
      dispatch({ type: "setPreviewLineNumber", previewLineNumber: srcLine });
    }
  }, [dispatch, slideshowScrollTop, srcLine]);

  const { class: className, ...attrs } = attributes;
  return React.createElement(
    elementTag,
    { ref, "data-line": srcLine, className, ...attrs },
    children
  );
}
