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
      processNode(node: Node, children, idx) {
        const { class: className, "data-line": dataLine, viewbox } = R.prop(
          "attribs",
          node
        );
        return (
          <Slide
            key={`slide-${idx + 1}`}
            className={className}
            srcLine={parseInt(dataLine, 10)}
            viewBox={viewbox}
          >
            {children}
          </Slide>
        );
      },
    },
    {
      // Processes slide elements
      shouldProcessNode(node: Node) {
        return R.hasPath(["attribs", "data-line"])(node);
      },
      processNode(node: Node, children) {
        const { attribs, name } = R.pick(["name", "attribs"], node);
        const dataLine = R.pipe(R.prop("data-line"), parseInt)(attribs);
        return (
          <SlideElement
            key={`slide-element-${name}-line-${dataLine}`}
            attributes={attribs}
            elementTag={name}
            srcLine={dataLine}
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
      processNode(node: Node, children, idx) {
        const attr = R.prop("attribs", node);
        return (
          <foreignObject key={`foreignobject-${idx + 1}`} {...attr}>
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
