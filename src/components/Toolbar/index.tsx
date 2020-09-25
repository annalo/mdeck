import React from "react";

import { Header } from "./Header";
import { Menu } from "./Menu";

import { LoadFileMenuItem } from "./LoadFile";
import { SaveFileMenuItem } from "./SaveFile";
import { PresentationMode as PresentationModeMenuItem } from "./PresentationMode";

const Toolbar = (): React.ReactElement => (
  <Header>
    <Menu>
      <LoadFileMenuItem />
      <SaveFileMenuItem />

      <PresentationModeMenuItem />
    </Menu>
  </Header>
);

export { Toolbar };
