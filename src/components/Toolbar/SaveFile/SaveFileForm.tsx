import React, { useRef } from "react";
import styled from "styled-components";

import Checkmark from "icons/check-mark.svg";
import Xmark from "icons/x-circle.svg";
import { BasicIcon } from "../Icon";

interface SaveFileFormProps {
  closeForm: () => void;
  filename: string;
  saveFile: (name: string | undefined) => void;
}

const Form = styled.form`
  align-items: center;
  display: flex;
  font-size: 12px;
  justify-content: center;
`;
const TextInput = styled.input`
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
    box-shadow: -8px 10px 0px -7px #4ea6ea, 8px 10px 0px -7px #4ea6ea;
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 2px;
  &:focus {
    outline: 0;
  }
`;

const SaveFileForm: React.FC<SaveFileFormProps> = ({
  closeForm,
  filename,
  saveFile,
}) => {
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
        <BasicIcon>
          <Checkmark />
        </BasicIcon>
      </Button>

      <Button aria-label="cancel" onClick={closeForm} type="button">
        <BasicIcon>
          <Xmark />
        </BasicIcon>
      </Button>
    </Form>
  );
};

export { SaveFileForm };
