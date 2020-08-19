import React from "react";

interface Props {
  children: React.ReactElement;
  attributes: { [key: string]: string };
  elementTag: string;
  lineNumber: number;
}

export function SlideElement({
  attributes,
  children,
  elementTag,
  lineNumber,
}: Props): React.ReactElement {
  const { class: className, ...attrs } = attributes;
  return React.createElement(elementTag, { className, ...attrs }, children);
}
