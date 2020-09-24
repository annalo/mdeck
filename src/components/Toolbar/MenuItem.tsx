import styled, { css } from "styled-components";

const iconStyle = css`
  svg {
    fill: ${(props) => props.theme.colorScheme.lightgrey};
    circle,
    path {
      stroke: ${(props) => props.theme.colorScheme.grey};
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
      fill: ${(props) => props.theme.colorScheme.silver};
      circle,
      path {
        stroke: ${(props) => props.theme.textColor};
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

const MenuItemWithTooltip = styled(MenuItem)`
  :hover {
    svg {
      transition: opacity 0.4s ease-in-out;
      opacity: 0.3;
      transform: none;
    }
  }
`;

export { MenuItem, MenuItemRight, MenuItemWithTooltip };
