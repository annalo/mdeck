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
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
  }

  :hover {
    svg {
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);
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
