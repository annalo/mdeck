import React, { useState } from "react";

import { useMarkdownState } from "contexts/MarkdownContext";

import SaveIcon from "icons/save.svg";
import { MenuItemWithTooltip } from "../MenuItem";
import { Tooltip } from "../Tooltip";
import { SaveFileForm } from "./SaveFileForm";

const SaveFileMenuItem = (): React.ReactElement => {
  const [save, toggleSave] = useState(false);
  const [filename, setFilename] = useState("");

  const { md } = useMarkdownState();

  return (
    <MenuItemWithTooltip onClick={() => toggleSave(true)}>
      {save ? (
        <SaveFileForm
          filename={filename}
          md={md}
          setFilename={setFilename}
          toggleSave={toggleSave}
        />
      ) : (
        <>
          <SaveIcon />
          <Tooltip text="SAVE" />
        </>
      )}
    </MenuItemWithTooltip>
  );
};

export { SaveFileMenuItem };
