import React from "react";
import styled, { css } from "styled-components";

import Checkmark from "icons/check-mark.svg";
import Xmark from "icons/x-circle.svg";
import { iconAnimation } from "../MenuItem";

interface SaveFileFormProps {
  closeForm: () => void;
  filename: string;
  saveFile: (event: React.FormEvent) => void;
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
  closeForm,
  filename,
  saveFile,
}: SaveFileFormProps): React.ReactElement => {
  const handleOnBlur = (ev) => {
    if (ev.relatedTarget?.type !== "submit") closeForm();
  };
  const handleKeyDown = (ev) => {
    if (ev.keyCode === 27) closeForm();
  };

  return (
    <Form onBlur={handleOnBlur} onKeyDown={handleKeyDown} onSubmit={saveFile}>
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
      <CancelButton onClick={closeForm}>
        <Xmark />
      </CancelButton>
    </Form>
  );
};

export { SaveFileForm };
