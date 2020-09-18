import React from "react";
import styled from "styled-components";

interface TooltipProps {
  text: string;
}

const HoverTooltip = styled.div`
  transition: opacity 0.2s ease-in-out;
  position: absolute;
  opacity: 0;
  color: #2f2f2f;
  font-weight: bolder;
  font-size: 8px;

  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;

  :hover {
    opacity: 1;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

const Tooltip = ({ text }: TooltipProps): React.ReactElement => (
  <HoverTooltip>{text}</HoverTooltip>
);

export { Tooltip };
