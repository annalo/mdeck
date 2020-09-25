import React from "react";
import styled, { css } from "styled-components";

import Checkmark from "icons/check-mark.svg";
import Xmark from "icons/x-circle.svg";
import { iconAnimation } from "../MenuItem";

interface SaveFileFormProps {
  filename: string;
  saveFile: (event: React.FormEvent) => void;
  toggleSave: (boolean) => void;
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
    ${iconAnimation}
    &:hover {
      fill: none;
    }
  }
`;
const SubmitButton = styled.button`
  border: none;
  padding: 0 2px;
  &:focus {
    outline: 0;
  }
  ${iconStyle}
`;
const CancelButton = styled.a`
  ${iconStyle}
`;

const SaveFileForm = ({
  filename,
  saveFile,
  toggleSave,
}: SaveFileFormProps): React.ReactElement => {
  const handleOnBlur = (ev) => {
    if (ev.relatedTarget?.type !== "submit") toggleSave(false);
  };

  return (
    <Form onBlur={handleOnBlur} onSubmit={saveFile}>
      <TextInput
        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        defaultValue={filename}
        name="filename"
        placeholder="Filename"
        type="text"
      />
      <SubmitButton type="submit">
        <Checkmark />
      </SubmitButton>
      <CancelButton onClick={() => toggleSave(false)}>
        <Xmark />
      </CancelButton>
    </Form>
  );
};

export { SaveFileForm };
