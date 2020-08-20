import React, { useContext, useEffect, useRef } from "react";
import { ObserverContext } from "utils/ObserverContext";

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
  const observer = useContext(ObserverContext);

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }
  }, [observer]);

  return (
    <svg ref={ref} className={className} data-marpit-svg="" viewBox={viewBox}>
      {children}
    </svg>
  );
};
