import React from "react";
import HtmlToReact, { Parser } from "html-to-react";

interface Node {
  name: string;
  attribs: Record<string, string>;
}

function render(htmlString: string): SlideElements {
  const TABLE_TAGS = ["table", "thead", "tbody", "tr"];
  function isTableDescendent(parent) {
    return parent && TABLE_TAGS.includes(parent.name);
  }
  const isValidNode = () => true;

  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const processingInstructions = [
    {
      shouldProcessNode({ parent, type }) {
        if (type === "text" && isTableDescendent(parent)) {
          return false;
        }
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];
  const parser = new Parser({
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
  });
  return parser.parseWithInstructions(
    htmlString,
    isValidNode,
    processingInstructions
  );
}

export { render };
