import React, { useContext, useEffect, useRef } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { MarkdownContext } from "contexts/MarkdownContext";
import { ObserverContext } from "contexts/ObserverContext";

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
  const { state } = useContext(MarkdownContext);
  const { textLineNumber } = state;

  useEffect(() => {
    const node = ref.current;
    if (node) observer?.observe(node);

    return () => {
      if (node) observer?.unobserve(node);
    };
  }, [observer]);

  useEffect(() => {
    const node = ref.current;
    if (srcLine !== textLineNumber || !node || !observer) return;

    observer.unobserve(node);
    scrollIntoView(node, { block: "start", inline: "nearest" }).then(() => {
      console.log("done");
      observer.observe(node);
    });
  }, [elementTag, observer, srcLine, textLineNumber]);

  const { class: className, ...attrs } = attributes;
  return React.createElement(
    elementTag,
    { ref, "data-line": srcLine, className, ...attrs },
    children
  );
}
