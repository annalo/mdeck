import React, { useEffect, useState } from "react";
import { render } from "utils/render";

interface UseElementsProps {
  htmlString: HtmlString;
}

function useElements({ htmlString }: UseElementsProps): React.ReactNode {
  const [elements, setElements] = useState<React.ReactNode>(null);
  useEffect(() => setElements(render(htmlString)), [htmlString]);
  return elements;
}

export { useElements };
