import styled from "styled-components";

const Navbar = styled.nav`
  background-color: #ededed;
  box-shadow: 0px 0px 1.5px ${(props) => props.theme.textColor};

  height: ${(props) => props.theme.toolbarHeight}px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
`;

export { Navbar };
