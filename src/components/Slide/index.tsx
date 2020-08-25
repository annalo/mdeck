import React, { useContext, useEffect, useRef } from "react";
import { SlideshowContext } from "contexts/SlideshowContext";

interface Props {
  className: string;
  srcLine: number;
  children: React.ReactElement;
  viewBox: string;
}

export const Slide: React.FC<Props> = ({
  children,
  className,
  srcLine,
  viewBox,
}: Props) => {
  const ref = useRef<SVGSVGElement>(null);
  const { observe } = useContext(SlideshowContext);

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
      {children}
    </svg>
  );
};
