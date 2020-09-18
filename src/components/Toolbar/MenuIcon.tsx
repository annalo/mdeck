import React from "react";
import styled from "styled-components";

import { MenuItem } from "./MenuItem";
import { Tooltip } from "./Tooltip";

interface MenuIconProps {
  children: React.ReactElement;
  tooltip: string;
}

const StyledMenuItem = styled(MenuItem)`
  :hover {
    svg {
      transition: "opacity 0.5s ease-in-out";
      opacity: 0.3;
      -webkit-transform: none;
      -moz-transform: none;
      -o-transform: none;
      -ms-transform: none;
      transform: none;
    }
  }
`;

const MenuIcon = ({ children, tooltip }: MenuIconProps): React.ReactElement => (
  <StyledMenuItem>
    {children}
    <Tooltip text={tooltip} />
  </StyledMenuItem>
);

export { MenuIcon };
