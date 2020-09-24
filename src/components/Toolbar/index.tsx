import React from "react";

import PresentationIcon from "icons/video-camera.svg";

import { Header } from "./Header";
import { Menu } from "./Menu";
import { MenuItemRight } from "./MenuItem";

import { LoadFileMenuItem } from "./LoadFile";
import { SaveFile as SaveFileMenuItem } from "./SaveFile";

const Toolbar = (): React.ReactElement => (
  <Header>
    <Menu>
      <LoadFileMenuItem />
      <SaveFileMenuItem />

      <MenuItemRight>
        <PresentationIcon />
      </MenuItemRight>
    </Menu>
  </Header>
);

export { Toolbar };
