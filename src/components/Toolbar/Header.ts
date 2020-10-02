import styled from "styled-components";

const Header = styled.nav`
  background-color: ${(props) => props.theme.toolbarColor};
  box-shadow: 0px 0px 1.5px ${(props) => props.theme.toolbarColor};

  height: ${(props) => props.theme.toolbarHeight}px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 5px;
`;

export { Header };
