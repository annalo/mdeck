import React from "react";

import SaveIcon from "icons/save.svg";

import { MenuItemWithTooltip } from "./MenuItem";
import { Tooltip } from "./Tooltip";

const SaveFile = (): React.ReactElement => (
  <MenuItemWithTooltip>
    <SaveIcon />
    <Tooltip text="SAVE" />
  </MenuItemWithTooltip>
);

export { SaveFile };
