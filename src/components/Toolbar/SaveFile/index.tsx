import React, { useState } from "react";
import { saveAs } from "file-saver";

import { useMarkdownState } from "contexts/MarkdownContext";

import SaveIcon from "icons/save.svg";
import { MenuItem, MenuItemWithTooltip } from "../MenuItem";
import { Tooltip } from "../Tooltip";
import { SaveFileForm } from "./SaveFileForm";

const SaveFileMenuItem = (): React.ReactElement => {
  const [isFormOpen, toggleForm] = useState(false);
  const [filename, setFilename] = useState("");

  const { md } = useMarkdownState();

  const openForm = () => toggleForm(true);
  const closeForm = () => toggleForm(false);

  const saveFile = (ev) => {
    ev.preventDefault();

    const text = ev.target.filename.value;
    const blob = new Blob([md], { type: "text/markdown" });

    saveAs(blob, text);
    setFilename(text);
    closeForm();
  };

  return isFormOpen ? (
    <MenuItem>
      <SaveFileForm
        closeForm={closeForm}
        filename={filename}
        saveFile={saveFile}
      />
    </MenuItem>
  ) : (
    <MenuItemWithTooltip onClick={openForm} role="button">
      <SaveIcon />
      <Tooltip text="SAVE" />
    </MenuItemWithTooltip>
  );
};

export { SaveFileMenuItem };
