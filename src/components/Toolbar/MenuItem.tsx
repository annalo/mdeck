import styled, { css } from "styled-components";

const iconStyle = css`
  svg {
    fill: #d4d4d4;
    circle,
    path {
      stroke: #888888;
    }
  }
`;

const iconAnimation = css`
  svg {
    transition: 0.5s ease-in-out;
  }

  :hover {
    svg {
      transform: scale(1.1);

      fill: #bababa;
      circle,
      path {
        stroke: #2f2f2f;
      }
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
  ${iconAnimation}
`;

const MenuItemRight = styled(MenuItem)`
  margin-left: auto;
`;

export { MenuItem, MenuItemRight };
