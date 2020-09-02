import React, { useRef } from "react";
import { useObserveElement } from "utils/useObserveElement";

interface Props {
  children: React.ReactNode;
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
  const ref = useRef<Element>(null);

  useObserveElement({ ref });

  const { class: className, ...attrs } = attributes;
  return React.createElement(
    elementTag,
    { ref, "data-line": srcLine, className, ...attrs },
    children
  );
};
