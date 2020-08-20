import React, { useContext, useEffect, useRef } from "react";
import { ObserverContext } from "utils/ObserverContext";

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
  const observer = useContext(ObserverContext);

  useEffect(() => {
    const node = ref.current;
    if (node) observer?.observe(node);

    return () => {
      if (node) observer?.unobserve(node);
    };
  }, [observer]);

  const { class: className, ...attrs } = attributes;
  return React.createElement(
    elementTag,
    { ref, "data-line": srcLine, className, ...attrs },
    children
  );
}
