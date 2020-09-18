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
      transition: opacity 0.4s ease-in-out;
      opacity: 0.3;
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
