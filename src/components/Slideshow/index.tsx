import React, { memo } from "react";
import styled from "styled-components/macro";

import { Slide } from "components/Slide";

interface Props {
  slides: string[];
}
const Container = styled.div`
  height: 100%;
  overflow: auto;

  img {
    display: block;
    max-width: 35%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Slideshow: React.FC<Props> = memo(({ slides }: Props) => (
  <Container className="slideshow">
    {slides.map((slide, i) => (
      <Slide key={`slide-${i + 1}`} html={slide} />
    ))}
  </Container>
));
