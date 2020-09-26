import styled from "styled-components";

const Slideshow = styled.article`
  height: 100%;
  overflow: auto;

  &:fullscreen {
    scroll-snap-type: y mandatory;

    .slide {
      display: grid;
      height: 100%;
      scroll-snap-align: start;
      svg {
        margin: auto;
      }
    }
  }

  &:-webkit-full-screen {
    background-color: rgba(255, 255, 255, 0);

    .slide {
      display: grid;
      height: 100%;
      svg {
        margin: auto;
      }
    }
  }
`;

export { Slideshow };
