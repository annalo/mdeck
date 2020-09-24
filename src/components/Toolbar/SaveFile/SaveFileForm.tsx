import React from "react";

interface SaveFileFormProps {
  filename: string;
  saveFile: (event: React.FormEvent) => void;
  toggleSave: (boolean) => void;
}

const SaveFileForm = ({
  filename,
  saveFile,
  toggleSave,
}: SaveFileFormProps): React.ReactElement => {
  const handleOnBlur = (ev) => {
    if (ev.relatedTarget.type !== "submit") toggleSave(false);
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
