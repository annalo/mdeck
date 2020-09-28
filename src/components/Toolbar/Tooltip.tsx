import React from "react";
import styled from "styled-components";

interface TooltipProps {
  text: string;
}

const HoverTooltip = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  color: ${(props) => props.theme.textColor};
  font-weight: bolder;
  font-size: 8px;

  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const Tooltip: React.FC<TooltipProps> = ({ text }) => (
  <HoverTooltip>{text}</HoverTooltip>
);

export { Tooltip };
