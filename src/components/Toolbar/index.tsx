import React from "react";

import { useMarkdownState } from "contexts/MarkdownContext";

import PresentationSvg from "icons/video-camera.svg";

import { Header } from "./Header";
import { Menu } from "./Menu";
import { MenuItemRight } from "./MenuItem";
import { Icon } from "./Icon";

import { LoadFileMenuItem } from "./LoadFile";
import { SaveFileMenuItem } from "./SaveFile";

interface ToolbarProps {
  requestPresentation: RequestPresentation;
}

const Toolbar: React.FC<ToolbarProps> = ({ requestPresentation }) => {
  const { md } = useMarkdownState();
  return (
    <Header>
      <Menu>
        <LoadFileMenuItem />
        <SaveFileMenuItem />

        <MenuItemRight
          aria-label="request-presentation"
          disabled={md === ""}
          onClick={requestPresentation}
          role="button"
        >
          <Icon>
            <PresentationSvg />
          </Icon>
        </MenuItemRight>
      </Menu>
    </Header>
  );
};

export { Toolbar };
