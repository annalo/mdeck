import React, { memo } from "react";
import styled from "styled-components/macro";

import { Slide } from "components/Slide";

interface Props {
  html: string;
}
const Container = styled.div`
  height: 100%;
  overflow: auto;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
  }
  img {
    display: block;
    max-width: 35%;
    margin-left: auto;
    margin-right: auto;
  }
  ul.contains-task-list {
    list-style-type: none;
  }
`;

export const Slideshow: React.FC<Props> = memo(({ html }: Props) => {
  return (
    <Container>
      <Slide />
      <br />
      <Slide />
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </Container>
  );
});
