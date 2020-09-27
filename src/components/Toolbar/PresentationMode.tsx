import React from "react";
import styled from "styled-components";

import { usePresentationActions } from "contexts/PresentationContext";
import PresentationIcon from "icons/video-camera.svg";
import { MenuItemRight, iconAnimation } from "./MenuItem";

const Icon = styled(PresentationIcon)`
  ${iconAnimation}
`;

const PresentationMode: React.FC = () => {
  const { present } = usePresentationActions();
  return (
    <MenuItemRight onClick={present} role="button">
      <Icon />
    </MenuItemRight>
  );
};

export { PresentationMode };
