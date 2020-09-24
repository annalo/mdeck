import React, { useEffect, useState } from "react";
import { render } from "utils/render";

function useElements(htmlString: HtmlString): React.ReactNode {
  const [elements, setElements] = useState<React.ReactNode>(null);
  useEffect(() => setElements(render(htmlString)), [htmlString]);
  return elements;
}

export { useElements };
