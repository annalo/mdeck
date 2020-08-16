import React from "react";

interface Props {
  children: React.ReactNode;
  lineNumber: number;
  type: string;
}

export function SlideElement({
  children,
  lineNumber,
  type,
}: Props): React.DOMElement<Record<string, unknown>, Element> {
  return React.createElement(type, {}, children);
}

// memo(SlideElement);
//
