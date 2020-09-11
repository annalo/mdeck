import { useEffect, useState } from "react";

type SlideNumber = number;
interface UseNavigationProps {
  slideCount: number;
}

function useNavigation({ slideCount }: UseNavigationProps): SlideNumber {
  const [currentSlide, setCurrentSlide] = useState<SlideNumber>(1);

  useEffect(() => {
    const nextSlide = () =>
      setCurrentSlide((slideNumber) =>
        slideNumber < slideCount ? slideNumber + 1 : slideNumber
      );
    const previousSlide = () =>
      setCurrentSlide((slideNumber) =>
        slideNumber > 1 ? slideNumber - 1 : slideNumber
      );

    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 37: // ArrowLeft
        case 38: // ArrowUp
          previousSlide();
          break;

        case 39: // ArrowRight
        case 40: // ArrowDown
          nextSlide();
          break;

        default: {
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, slideCount]);

  return currentSlide;
}

export { useNavigation };
