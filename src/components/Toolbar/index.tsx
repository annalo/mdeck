import React from "react";
import styled from "styled-components";

import SaveIcon from "icons/save.svg";
import FileIcon from "icons/folder-add-file.svg";
import MaximizeIcon from "icons/maximize-expand.svg";

const NAVBAR_HEIGHT = 18;

const NavBar = styled.nav`
  * {
    padding: 0;
    margin: 0;
  }

  background-color: #ededed;
  -webkit-box-shadow: 0px 1px 2px #e0e0e0;
  -moz-box-shadow: 0px 1px 2px #e0e0e0;
  box-shadow: 0px 1px 2px #e0e0e0;

  height: ${NAVBAR_HEIGHT}px;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 8px;
`;
const Menu = styled.ul`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  height: ${NAVBAR_HEIGHT}px;
`;
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex: 1; */

  margin: 0 3px;

  svg {
    height: 85%;
    fill: white;
  }
`;
const MenuItemRight = styled(MenuItem)`
  margin-left: auto;
`;

const Toolbar = (): React.ReactElement => (
  <NavBar>
    <Menu>
      <MenuItem>
        <SaveIcon />
      </MenuItem>
      <MenuItem>
        <FileIcon />
      </MenuItem>
      <MenuItemRight>
        <MaximizeIcon />
      </MenuItemRight>
    </Menu>
  </NavBar>
);

export { NAVBAR_HEIGHT, Toolbar };
