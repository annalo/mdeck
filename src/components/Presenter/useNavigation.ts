import { useCallback, useEffect, useState } from "react";
import * as R from "ramda";

type SlideNumber = number;
interface UseNavigationProps {
  slideCount: number;
}

function useNavigation({ slideCount }: UseNavigationProps): SlideNumber {
  const [currentSlide, setCurrentSlide] = useState<SlideNumber>(1);

  const pageUp = useCallback(() => {
    setCurrentSlide((slideNumber) =>
      R.ifElse(R.equals(slideCount), R.identity, R.add(1))(slideNumber)
    );
  }, [setCurrentSlide, slideCount]);
  const pageDown = useCallback(() => {
    setCurrentSlide((slideNumber) =>
      R.ifElse(R.equals(1), R.identity, R.subtract(1))(slideNumber)
    );
  }, [setCurrentSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 37:
        case 38: {
          pageDown();
          break;
        }
        case 39:
        case 40: {
          pageUp();
          break;
        }
        default: {
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, pageUp, pageDown]);

  return currentSlide;
}

export { useNavigation };
