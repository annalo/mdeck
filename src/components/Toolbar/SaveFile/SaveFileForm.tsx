import React, { useRef } from "react";
import styled, { css } from "styled-components";

import Checkmark from "icons/check-mark.svg";
import Xmark from "icons/x-circle.svg";
import { iconAnimation } from "../MenuItem";

interface SaveFileFormProps {
  closeForm: () => void;
  filename: string;
  saveFile: (name: string | undefined) => void;
}

const Form = styled.form`
  font-size: 12px;
`;
const TextInput = styled.input`
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
    box-shadow: -8px 10px 0px -7px #4ea6ea, 8px 10px 0px -7px #4ea6ea;
  }
`;
const iconStyle = css`
  svg {
    fill: none;
    &:hover {
      fill: none;
    }
    ${iconAnimation}
  }
`;
const Button = styled.button`
  border: none;
  padding: 0 2px;
  &:focus {
    outline: 0;
  }
  ${iconStyle}
`;

const SaveFileForm = ({
  closeForm,
  filename,
  saveFile,
}: SaveFileFormProps): React.ReactElement => {
  const filenameInputRef = useRef<HTMLInputElement>(null);

  const handleOnBlur = (ev) => {
    if (ev.relatedTarget?.type !== "submit") closeForm();
  };
  const handleKeyDown = (ev) => {
    if (ev.keyCode === 27) closeForm();
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFile(filenameInputRef?.current?.value);
  };

  return (
    <Form
      onBlur={handleOnBlur}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
      <TextInput
        ref={filenameInputRef}
        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        defaultValue={filename}
        name="filename"
        placeholder="Filename"
        type="text"
      />

      <Button aria-label="submit" type="submit">
        <Checkmark />
      </Button>

      <Button aria-label="cancel" onClick={closeForm} type="button">
        <Xmark />
      </Button>
    </Form>
  );
};

export { SaveFileForm };
