import React from "react";
import styled from "styled-components";

import PresentationIcon from "icons/video-camera.svg";
import { MenuItemRight, iconAnimation } from "./MenuItem";

const Icon = styled(PresentationIcon)`
  ${iconAnimation}
`;

const PresentationMode = (): React.ReactElement => (
  <MenuItemRight>
    <Icon />
  </MenuItemRight>
);

export { PresentationMode };
