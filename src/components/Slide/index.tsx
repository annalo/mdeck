import React, { useRef } from "react";
import { useObserveElement } from "utils/useObserveElement";

interface Props {
  className: string;
  index: number;
  srcLine: LineNumber;
  children: React.ReactNode;
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

  useObserveElement({ ref });

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
