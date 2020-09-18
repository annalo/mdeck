import styled, { css } from "styled-components";
import { NAVBAR_HEIGHT } from "./Navbarssss";

const Menu = styled.ul`
  display: flex;
  height: ${NAVBAR_HEIGHT}px;
`;

const iconStyle = css`
  svg {
    fill: #d4d4d4;

    circle,
    path {
      stroke: #888888;
    }

    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
  }

  :hover {
    svg {
      fill: #bababa;
      circle,
      path {
        stroke: #2f2f2f;
      }

      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;

  ${iconStyle}
`;

const MenuItemRight = styled(MenuItem)`
  margin-left: auto;
`;

export { Menu, MenuItem, MenuItemRight };
