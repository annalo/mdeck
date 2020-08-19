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
    {
      // Processes slides
      shouldProcessNode({ name }) {
        return name === "svg";
      },
      processNode({ name, attribs }, children, idx) {
        return (
          <Slide
            key={`slide-${idx + 1}`}
            className={attribs["class"]}
            lineNumber={parseInt(attribs["data-line"], 10)}
            viewBox={attribs["viewbox"]}
          >
            {children}
          </Slide>
        );
      },
    },
    {
      // camelcase foreignObject html tag
      shouldProcessNode({ name }) {
        return name === "foreignobject";
      },
      processNode({ attribs }, children, idx) {
        return (
          <foreignObject key={`foreignobject-${idx + 1}`} {...attribs}>
            {children}
          </foreignObject>
        );
      },
    },
    {
      // Processes slide elements
      shouldProcessNode({ attribs }) {
        return attribs && attribs["data-line"];
      },
      processNode({ name, attribs }, children) {
        return (
          <SlideElement
            attributes={attribs}
            key={`slide-element-${name}-line-${attribs["data-line"]}`}
            elementTag={name}
            lineNumber={parseInt(attribs["data-line"], 10)}
          >
            {children}
          </SlideElement>
        );
      },
    },
    {
      // Everything else
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
