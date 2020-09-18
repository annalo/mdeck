import styled from "styled-components";

const NAVBAR_HEIGHT = 18;

const Navbar = styled.nav`
  * {
    padding: 0;
    margin: 0;
  }

  background-color: #ededed;
  -webkit-box-shadow: 0px 1px 2px #e0e0e0;
  -moz-box-shadow: 0px 1px 2px #e0e0e0;
  box-shadow: 0px 1px 2px #e0e0e0;

  height: ${NAVBAR_HEIGHT}px;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 8px;
`;

export { NAVBAR_HEIGHT, Navbar };
