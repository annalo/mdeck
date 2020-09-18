import styled from "styled-components";

const NAVBAR_HEIGHT = 25;

const Navbar = styled.nav`
  * {
    padding: 0;
    margin: 0;
  }

  background-color: #ededed;
  -webkit-box-shadow: 0px 0px 1.5px #2f2f2f;
  -moz-box-shadow: 0px 0px 1.5px #2f2f2f;
  box-shadow: 0px 0px 1.5px #2f2f2f;

  height: ${NAVBAR_HEIGHT}px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
`;

export { NAVBAR_HEIGHT, Navbar };
