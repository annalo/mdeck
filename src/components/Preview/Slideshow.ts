import styled from "styled-components";

const Slideshow = styled.article`
  height: 100%;
  overflow: auto;

  &:fullscreen {
    scroll-snap-type: y mandatory;

    .slide {
      border: none;
      box-shadow: none;
      display: grid;
      height: 100%;
      margin: 0;
      scroll-snap-align: start;

      svg {
        margin: auto;
      }
    }
  }

  &:-webkit-full-screen {
    background-color: rgba(255, 255, 255, 0);
    scroll-snap-type: y mandatory;

    .slide {
      border: none;
      box-shadow: none;
      display: grid;
      height: 100%;
      margin: 0;
      scroll-snap-align: start;

      svg {
        margin: auto;
      }
    }
  }
`;

export { Slideshow };
