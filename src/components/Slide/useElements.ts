import React, { useEffect, useState } from "react";
import { render } from "./render";

interface UseElementsProps {
  htmlString: HtmlString;
}

export const useElements = ({
  htmlString,
}: UseElementsProps): React.ReactNode => {
  const [elements, setElements] = useState<React.ReactNode>(null);

  useEffect(() => setElements(render(htmlString)), [htmlString]);

  return elements;
};
