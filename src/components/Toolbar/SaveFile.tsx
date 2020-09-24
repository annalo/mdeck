import React, { useState } from "react";
import { saveAs } from "file-saver";

import { useMarkdownState } from "contexts/MarkdownContext";

import SaveIcon from "icons/save.svg";
import { MenuItemWithTooltip } from "./MenuItem";
import { Tooltip } from "./Tooltip";

const SaveFile = (): React.ReactElement => {
  const [save, toggleSave] = useState(false);
  const [filename, setFilename] = useState("");

  const { md } = useMarkdownState();

  const handleOnBlur = (e) => {
    if (e.relatedTarget.type !== "submit") toggleSave(false);
  };

  const saveFile = (e) => {
    e.preventDefault();

    const text = e.target.filename.value;
    const blob = new Blob([md], { type: "text/markdown" });
    setFilename(text);
    saveAs(blob, text);
  };

  return (
    <MenuItemWithTooltip onClick={() => toggleSave(true)}>
      {save ? (
        <form onBlur={handleOnBlur} onSubmit={saveFile}>
          <input
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            defaultValue={filename}
            name="filename"
            placeholder="Filename"
            type="text"
          />
          <input type="submit" />
        </form>
      ) : (
        <>
          <SaveIcon />
          <Tooltip text="SAVE" />
        </>
      )}
    </MenuItemWithTooltip>
  );
};

export { SaveFile };
