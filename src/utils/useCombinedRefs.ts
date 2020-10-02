/* eslint-disable */
/*
 * Combines refs when forwarding ref from parent
 */
import { useEffect, useRef } from "react";

const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

export { useCombinedRefs };
