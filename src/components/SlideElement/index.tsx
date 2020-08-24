import React, { useContext, useRef, useEffect } from "react";

import { SlideshowContext } from "contexts/SlideshowContext";

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
  const { observe } = useContext(SlideshowContext);

  useEffect(() => {
    const node = ref.current;
    if (node) observe(node);
  }, [observe]);

  const { class: className, ...attrs } = attributes;
  return React.createElement(
    elementTag,
    { ref, "data-line": srcLine, className, ...attrs },
    children
  );
}
