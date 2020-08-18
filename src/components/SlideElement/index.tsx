/* eslint-disable */
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  contentAttributes: {};
  elementTag: string;
  lineNumber: number;
}

export function SlideElement({
  children,
  contentAttributes,
  elementTag,
  lineNumber,
}) {
  return React.createElement(elementTag, { ...contentAttributes }, children);
}
