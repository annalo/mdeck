import styled from "styled-components";

const MenuItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
`;

const MenuItemRight = styled(MenuItem)`
  margin-left: auto;
`;

export { MenuItem, MenuItemRight };
