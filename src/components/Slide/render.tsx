import React from "react";
import { DomHandler, Parser } from "htmlparser2";

const buildElement = (node, index) => {
  const { attribs, children, data, name, type } = node;
  if (type === "text") return data;

  return React.createElement(
    name,
    { key: `${name}-${index}`, className: attribs.class, ...attribs },
    children.map((childNode, i) => buildElement(childNode, i))
  );
};
const traverseTree = (tree) => tree.map((node, i) => buildElement(node, i));

export const render = (htmlString: HtmlString): React.ReactNode => {
  const handler = new DomHandler();
  const parser = new Parser(handler, {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
  });
  parser.parseComplete(htmlString);

  return traverseTree(handler.dom);
};
