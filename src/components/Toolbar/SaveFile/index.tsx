import React, { useState } from "react";
import { saveAs } from "file-saver";

import { useMarkdownState } from "contexts/MarkdownContext";

import SaveSvg from "icons/save.svg";
import { MenuItem } from "../MenuItem";
import { IconWithTooltip } from "../Icon";
import { Tooltip } from "../Tooltip";
import { SaveFileForm } from "./SaveFileForm";

const SaveFileMenuItem: React.FC = () => {
  const [isFormOpen, toggleForm] = useState(false);
  const [filename, setFilename] = useState("");

  const { md } = useMarkdownState();

  const openForm = () => toggleForm(true);
  const closeForm = () => toggleForm(false);

  const saveFile = (name) => {
    const blob = new Blob([md], { type: "text/markdown" });

    saveAs(blob, name);
    setFilename(name);
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
    <MenuItem aria-label="save-file" onClick={openForm} role="button">
      <IconWithTooltip>
        <SaveSvg />
        <Tooltip text="SAVE" />
      </IconWithTooltip>
    </MenuItem>
  );
};

export { SaveFileMenuItem };
