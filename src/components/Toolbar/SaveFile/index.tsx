import React, { useState } from "react";
import { saveAs } from "file-saver";

import { useMarkdownState } from "contexts/MarkdownContext";

import SaveIcon from "icons/save.svg";
import { MenuItemWithTooltip } from "../MenuItem";
import { Tooltip } from "../Tooltip";
import { SaveFileForm } from "./SaveFileForm";

const SaveFileMenuItem = (): React.ReactElement => {
  const [save, toggleSave] = useState(false);
  const [filename, setFilename] = useState("");

  const { md } = useMarkdownState();

  const saveFile = (ev) => {
    ev.preventDefault();

    const text = ev.target.filename.value;
    const blob = new Blob([md], { type: "text/markdown" });
    // TODO chain in promises
    saveAs(blob, text);
    setFilename(text);
    toggleSave(false);
  };

  return (
    <MenuItemWithTooltip onClick={() => toggleSave(true)}>
      {save ? (
        <SaveFileForm
          filename={filename}
          saveFile={saveFile}
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
