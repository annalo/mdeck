import React from "react";

import SaveIcon from "icons/save.svg";
import OpenFileIcon from "icons/folder-add-file.svg";
import PresentationIcon from "icons/video-camera.svg";

import { Header } from "./Header";
import { Menu } from "./Menu";
import { MenuIcon } from "./MenuIcon";
import { MenuItemRight } from "./MenuItem";

const Toolbar = (): React.ReactElement => (
  <Header>
    <Menu>
      <MenuIcon tooltip="LOAD">
        <OpenFileIcon />
      </MenuIcon>

      <MenuIcon tooltip="SAVE">
        <SaveIcon />
      </MenuIcon>

      <MenuItemRight>
        <PresentationIcon />
      </MenuItemRight>
    </Menu>
  </Header>
);

export { Toolbar };
