import { useEffect, useState } from "react";

type SlideNumber = number;

function useNavigation(): SlideNumber {
  const [currentSlide, setCurrentSlide] = useState<SlideNumber>(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 37:
        case 38: {
          setCurrentSlide(currentSlide - 1);
          break;
        }
        case 39:
        case 40: {
          setCurrentSlide(currentSlide + 1);
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
  }, [currentSlide, setCurrentSlide]);

  return currentSlide;
}

export { useNavigation };
