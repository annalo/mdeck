import React, { useContext, useEffect, useRef } from "react";
import { SlideshowObserver } from "contexts/SlideshowObserver";

interface Props {
  className: string;
  index;
  srcLine: number;
  children: React.ReactElement;
  viewBox: string;
}

export const Slide: React.FC<Props> = ({
  children,
  className,
  index,
  srcLine,
  viewBox,
}: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const { observe } = useContext(SlideshowObserver);

  useEffect(() => {
    const node = ref.current;
    if (node) observe(node);
  }, [observe]);

  return (
    <svg
      ref={ref}
      aria-label={`slide-${index + 1}`}
      className={className}
      data-line={srcLine}
      role="img"
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
};
