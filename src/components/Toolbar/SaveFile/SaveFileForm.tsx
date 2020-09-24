import React from "react";
import { saveAs } from "file-saver";

interface SaveFileFormProps {
  md: MarkdownString;
  filename: string;
  setFilename: (string) => void;
  toggleSave: (boolean) => void;
}

const SaveFileForm = ({
  md,
  filename,
  setFilename,
  toggleSave,
}: SaveFileFormProps): React.ReactElement => {
  const handleOnBlur = (e) => {
    if (e.relatedTarget.type !== "submit") toggleSave(false);
  };

  const saveFile = (e) => {
    e.preventDefault();

    const text = e.target.filename.value;
    const blob = new Blob([md], { type: "text/markdown" });
    // TODO chain in promises
    setFilename(text);
    saveAs(blob, text);
    toggleSave(false);
  };

  return (
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
  );
};

export { SaveFileForm };
