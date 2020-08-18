/* eslint-disable */
// TODO remove eslint disable
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
    // {
    //   // Processes slides
    //   shouldProcessNode(node) {
    //     return node.name === "section";
    //   },

    //   processNode(node, children, idx) {
    //     return (
    //       <Slide key={`slide-${idx + 1}`} {...node.attribs}>
    //         {children}
    //       </Slide>
    //     );
    //   },
    // },
    // {
    //   // Processes slide elements
    //   shouldProcessNode(node) {
    //     return node.attribs && node.attribs["data-line"];
    //   },
    //   processNode(node, children) {
    //     return (
    //       <SlideElement
    //         key={`slide-element-${node.name}-line-${node.attribs["data-line"]}`}
    //         // TODO camelcase attributes
    //         contentAttributes={node.attribs}
    //         elementTag={node.name}
    //         lineNumber={parseInt(node.attribs["data-line"], 10)}
    //       >
    //         {children}
    //       </SlideElement>
    //     );
    //   },
    // },
    {
      // camelcase foreignObject html tag
      shouldProcessNode(node) {
        return node.name === "foreignobject";
      },
      processNode(node, children) {
        return <foreignObject {...node.attribs}>{children}</foreignObject>;
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
