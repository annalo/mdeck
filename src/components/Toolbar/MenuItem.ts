import styled, { css } from "styled-components";

interface MenuItemProps {
  disabled?: boolean;
}

const disabled = css`
  opacity: 0.4;
  pointer-events: none;
`;

const MenuItem = styled.li<MenuItemProps>`
  cursor: pointer;
  display: flex;
  margin: 0 3px;

  ${(props) => props.disabled && disabled};
`;

const MenuItemRight = styled(MenuItem)`
  margin-left: auto;
`;

export { MenuItem, MenuItemRight };
