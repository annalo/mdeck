import React, { useContext, useEffect, useRef } from "react";
import { SlideshowObserver } from "contexts/SlideshowObserver";

interface Props {
  children: React.ReactElement;
  attributes: { [key: string]: string };
  elementTag: string;
  srcLine: number;
}

export const SlideElement = ({
  attributes,
  children,
  elementTag,
  srcLine,
}: Props): React.ReactElement => {
  const ref = useRef<SVGSVGElement>(null);
  const { observe } = useContext(SlideshowObserver);

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
};
