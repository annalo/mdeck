import React, { useRef } from "react";
import styled from "styled-components";

import OpenFileIcon from "icons/folder-add-file.svg";

import { MenuItemWithTooltip } from "../MenuItem";
import { Tooltip } from "../Tooltip";

const FileLoader = styled.input`
  display: none;
`;

const LoadFileMenuItem = (): React.ReactElement => {
  const fileLoaderRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileLoaderRef?.current?.click();

  return (
    <>
      <FileLoader
        ref={fileLoaderRef}
        accept=".md,.txt"
        id="fileLoader"
        title="Load Markdown File"
        type="file"
      />

      <MenuItemWithTooltip onClick={handleClick}>
        <OpenFileIcon />
        <Tooltip text="LOAD" />
      </MenuItemWithTooltip>
    </>
  );
};

export { LoadFileMenuItem };
