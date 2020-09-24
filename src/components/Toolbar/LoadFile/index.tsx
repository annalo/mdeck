import React, { useRef } from "react";
import styled from "styled-components";

import OpenFileIcon from "icons/folder-add-file.svg";

import { MenuItemWithTooltip } from "../MenuItem";
import { Tooltip } from "../Tooltip";

const FileLoader = styled.input`
  display: none;
`;

const readUploadedFileAsText = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

const LoadFileMenuItem = (): React.ReactElement => {
  const fileLoaderRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileLoaderRef?.current?.click();
  const handleLoad = async (e) => {
    const file = e.target.files[0];

    try {
      const fileContents = await readUploadedFileAsText(file);
      console.log(fileContents);
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <>
      <FileLoader
        ref={fileLoaderRef}
        accept=".md,.txt"
        id="fileLoader"
        onChange={handleLoad}
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
