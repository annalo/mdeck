/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import HtmlToReact, { Parser } from "html-to-react";
import * as R from "ramda";
import { Slide } from "components/Slide/Loadable";
import { SlideElement } from "components/SlideElement";

interface Node {
  name: string;
  attribs: Record<string, string>;
}

const TABLE_TAGS = ["table", "thead", "tbody", "tr"];

const getName = R.prop("name");

const isTableDescendent = R.both(
  R.has("parent"),
  R.pipe(R.path(["parent", "name"]), R.includes(R.__, TABLE_TAGS))
);

export const render = (htmlString: string): Array<React.ReactElement> => {
  const isValidNode = () => true;

  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const processingInstructions = [
    {
      // Processes slides
      shouldProcessNode(node) {
        return R.pipe(getName, R.equals("svg"))(node);
      },
      processNode({ attribs }: Node, children, idx) {
        return (
          <Slide
            key={`slide-${idx + 1}`}
            className={attribs.class}
            srcLine={parseInt(attribs["data-line"], 10)}
            viewBox={attribs.viewbox}
          >
            {children}
          </Slide>
        );
      },
    },
    {
      // Processes slide elements
      shouldProcessNode(node: Node) {
        return R.path(["attribs", "data-line"])(node);
      },
      processNode({ name, attribs }: Node, children) {
        return (
          <SlideElement
            key={`slide-element-${name}-line-${attribs["data-line"]}`}
            attributes={attribs}
            elementTag={name}
            srcLine={parseInt(attribs["data-line"], 10)}
          >
            {children}
          </SlideElement>
        );
      },
    },
    {
      // camelcase foreignObject html tag
      shouldProcessNode(node) {
        return R.pipe(getName, R.equals("foreignobject"))(node);
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
      shouldProcessNode(node) {
        // Skip processing whitespace text for table elements
        return !R.both(R.propEq("type", "text"), isTableDescendent)(node);
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
};
