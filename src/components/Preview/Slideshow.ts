import styled from "styled-components";

const Slideshow = styled.article`
  height: 100%;
  overflow: auto;

  &:fullscreen {
    scroll-snap-type: y mandatory;

    .slide {
      display: grid;
      height: 100%;
      margin: 0;
      scroll-snap-align: start;

      svg {
        border: none;
        box-shadow: none;
        margin: auto;
      }
    }
  }

  &:-webkit-full-screen {
    background-color: rgba(255, 255, 255, 0);
    scroll-snap-type: y mandatory;

    .slide {
      display: grid;
      height: 100%;
      margin: 0;
      scroll-snap-align: start;

      svg {
        border: none;
        box-shadow: none;
        margin: auto;
      }
    }
  }
`;

export { Slideshow };
