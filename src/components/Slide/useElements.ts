import React, { useEffect, useState } from "react";
import { DomHandler, Parser } from "htmlparser2";

interface UseElementsProps {
  htmlString: HtmlString;
}

export const useElements = ({
  htmlString,
}: UseElementsProps): React.ReactNode => {
  const [elements, setElements] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handler = new DomHandler();
    const parser = new Parser(handler, {
      lowerCaseTags: false,
      lowerCaseAttributeNames: false,
    });
    parser.parseComplete(htmlString);

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

    setElements(traverseTree(handler.dom));
  }, [htmlString]);

  return elements;
};
