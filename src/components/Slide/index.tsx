import React from "react";

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
  return (
    <svg className={className} data-marpit-svg="" viewBox={viewBox}>
      {children}
    </svg>
  );
};
