import React, { memo } from "react";
import styled from "styled-components/macro";

import { Slide } from "components/Slide";

interface Props {
  slides: string[];
}
const Container = styled.div`
  height: 100%;
  overflow: auto;

  /* center image */
  img {
    display: block;
    max-width: 35%;
    margin-left: auto;
    margin-right: auto;
  }

  /* remove bullet for checklist */
  ul.contains-task-list {
    list-style-type: none;
  }
`;

export const Slideshow: React.FC<Props> = memo(({ slides }: Props) => (
  <Container className="slideshow">
    {slides.map((slide, i) => (
      <Slide key={`slide-${i + 1}`} html={slide} />
    ))}
  </Container>
));
