import React from "react";

interface Props {
  children: React.ReactElement;
  contentAttributes: { [key: string]: string };
  elementTag: string;
  lineNumber: number;
}

export function SlideElement({
  children,
  contentAttributes,
  elementTag,
  lineNumber,
}: Props): React.ReactElement {
  return React.createElement(elementTag, contentAttributes, children);
}
