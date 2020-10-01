import React, { useRef } from "react";
import styled from "styled-components";

import { useMarkdownDispatch } from "contexts/MarkdownContext";
import { MarkdownContextReducerActionType } from "types/markdown-context-reducer-action";

import FileSvg from "icons/folder-file.svg";
import { MenuItem } from "../MenuItem";
import { IconWithTooltip } from "../Icon";
import { Tooltip } from "../Tooltip";

const FileLoader = styled.input`
  display: none;
`;

const LoadFileMenuItem: React.FC = () => {
  const fileLoaderRef = useRef<HTMLInputElement>(null);
  const dispatch = useMarkdownDispatch();

  const handleClick = () => fileLoaderRef?.current?.click();
  const handleLoad = async (ev) => {
    const file = ev.target.files[0];

    file
      .text()
      .then((text) =>
        dispatch({
          type: MarkdownContextReducerActionType.SetMd,
          md: text,
        })
      )
      .catch((error) => console.warn(error)); // TODO handle error message on screen
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

      <MenuItem aria-label="load-file" onClick={handleClick} role="button">
        <IconWithTooltip>
          <FileSvg />
          <Tooltip text="LOAD" />
        </IconWithTooltip>
      </MenuItem>
    </>
  );
};

export { LoadFileMenuItem };
