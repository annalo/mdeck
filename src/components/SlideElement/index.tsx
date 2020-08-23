import React, { useContext, useRef, useEffect } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

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
  const { state, dispatch } = useContext(MarkdownContext);
  const { textLineNumber } = state;

  const [slideshowScrollTop] = useSlideshowScrollTop();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

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
