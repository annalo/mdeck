import React from "react";
import styled from "styled-components";

import PresentationIconSvg from "icons/video-camera.svg";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { MenuItemRight, iconAnimation } from "./MenuItem";

import { LoadFileMenuItem } from "./LoadFile";
import { SaveFileMenuItem } from "./SaveFile";

const PresentationIcon = styled(PresentationIconSvg)`
  ${iconAnimation}
`;

interface ToolbarProps {
  requestPresentation: RequestPresentation;
}

const Toolbar: React.FC<ToolbarProps> = ({ requestPresentation }) => (
  <Header>
    <Menu>
      <LoadFileMenuItem />
      <SaveFileMenuItem />

      <MenuItemRight
        aria-label="request-presentation"
        onClick={requestPresentation}
        role="button"
      >
        <PresentationIcon />
      </MenuItemRight>
    </Menu>
  </Header>
);

export { Toolbar };
