/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import HtmlToReact, { Parser } from "html-to-react";

import { Slide } from "components/Slide/Loadable";
import { SlideElement } from "components/SlideElement";

interface Node {
  name: string;
  attribs: Record<string, string>;
}

const TABLE_TAGS = ["table", "thead", "tbody", "tr"];
function isTableDescendent(parent) {
  return parent && TABLE_TAGS.includes(parent.name);
}

export function render(htmlString: string): Array<React.ReactElement> {
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
      processNode({ attribs }: Node, children, idx) {
        return (
          <Slide
            key={`slide-${idx + 1}`}
            className={attribs.class}
            lineNumber={parseInt(attribs["data-line"], 10)}
            viewBox={attribs.viewbox}
          >
            {children}
          </Slide>
        );
      },
    },
    {
      // Processes slide elements
      shouldProcessNode({ attribs }: Node) {
        return attribs && attribs["data-line"];
      },
      processNode({ name, attribs }: Node, children) {
        return (
          <SlideElement
            key={`slide-element-${name}-line-${attribs["data-line"]}`}
            attributes={attribs}
            elementTag={name}
            lineNumber={parseInt(attribs["data-line"], 10)}
          >
            {children}
          </SlideElement>
        );
      },
    },
    {
      // camelcase foreignObject html tag
      shouldProcessNode({ name }) {
        return name === "foreignobject";
      },
      processNode({ attribs }: Node, children, idx) {
        return (
          <foreignObject key={`foreignobject-${idx + 1}`} {...attribs}>
            {children}
          </foreignObject>
        );
      },
    },

    {
      // Everything else
      shouldProcessNode({ parent, type }) {
        if (type === "text" && isTableDescendent(parent)) {
          return false;
        }
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
