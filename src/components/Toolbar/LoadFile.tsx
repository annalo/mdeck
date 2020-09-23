import React, { useRef } from "react";
import styled from "styled-components";

import OpenFileIcon from "icons/folder-add-file.svg";

import { MenuItemWithTooltip } from "./MenuItem";
import { Tooltip } from "./Tooltip";

const FileLoader = styled.input`
  display: none;
`;

const LoadFile = (): React.ReactElement => {
  const fileLoaderRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileLoaderRef?.current?.click();

  return (
    <>
      <FileLoader
        ref={fileLoaderRef}
        id="fileLoader"
        name="files"
        title="Load File"
        type="file"
      />

      <MenuItemWithTooltip onClick={handleClick}>
        <OpenFileIcon />
        <Tooltip text="LOAD" />
      </MenuItemWithTooltip>
    </>
  );
};

export { LoadFile };
