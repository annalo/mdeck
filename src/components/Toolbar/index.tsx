import React from "react";

import SaveIcon from "icons/save.svg";
import FileIcon from "icons/folder-add-file.svg";
import CameraIcon from "icons/video-camera.svg";

import { Menu, MenuItem, MenuItemRight } from "./Menu";
import { Navbar } from "./Navbar";

const Toolbar = (): React.ReactElement => (
  <Navbar>
    <Menu>
      <MenuItem>
        <SaveIcon />
      </MenuItem>
      <MenuItem>
        <FileIcon />
      </MenuItem>
      <MenuItemRight>
        <CameraIcon />
      </MenuItemRight>
    </Menu>
  </Navbar>
);

export { Toolbar };
