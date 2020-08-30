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
      className={className}
      data-line={srcLine}
      data-marpit-svg=""
      viewBox={viewBox}
    >
      <title>{`Slide ${index + 1}`}</title>
      {children}
    </svg>
  );
};
