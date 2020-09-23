import React from "react";

import PresentationIcon from "icons/video-camera.svg";

import { Header } from "./Header";
import { Menu } from "./Menu";
import { MenuItemRight } from "./MenuItem";

import { LoadFile } from "./LoadFile";
import { SaveFile } from "./SaveFile";

const Toolbar = (): React.ReactElement => (
  <Header>
    <Menu>
      <LoadFile />
      <SaveFile />

      <MenuItemRight>
        <PresentationIcon />
      </MenuItemRight>
    </Menu>
  </Header>
);

export { Toolbar };
