import React from "react";
import HtmlToReact, { Parser } from "html-to-react";

import { Slide } from "components/Slide/Loadable";
import { SlideElement } from "components/SlideElement";

export function render(htmlString: string): Array<any> {
  function isValidNode() {
    return true;
  }
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const processingInstructions = [
    {
      // Processes slides
      shouldProcessNode(node) {
        return node.name === "section";
      },

      processNode(node, children, idx) {
        return <Slide key={`slide-${idx + 1}`}>{children}</Slide>;
      },
    },
    {
      // Processes slide elements
      shouldProcessNode(node) {
        return node.attribs && node.attribs["data-line"];
      },

      processNode(node, children) {
        return (
          <SlideElement
            key={`slide-element-${node.name}-line-${node.attribs["data-line"]}`}
            lineNumber={node.attribs["data-line"]}
            type={node.name}
          >
            {children}
          </SlideElement>
        );
      },
    },
    {
      // Anything else
      shouldProcessNode() {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];
  const parser = new Parser();
  return parser.parseWithInstructions(
    htmlString,
    isValidNode,
    processingInstructions
  );
}
