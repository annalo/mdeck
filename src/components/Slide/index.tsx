/* eslint-disable */
// TODO remove eslint disable
import React from "react";

interface Props {
  children: any;
}

export const Slide: React.FC<Props> = (props) => {
  return <svg {...props}>{props.children}</svg>;
};
