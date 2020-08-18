import React from "react";

interface Props {
  className: string;
  children: React.ReactElement;
  lineNumber: number;
  viewBox: string;
}

export const Slide: React.FC<Props> = ({
  children,
  className,
  viewBox,
  lineNumber,
}: Props) => {
  return (
    <svg className={className} data-marpit-svg="" viewBox={viewBox}>
      {children}
    </svg>
  );
};
