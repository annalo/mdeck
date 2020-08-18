import React, { memo } from "react";
import styled from "styled-components/macro";
import { render } from "utils/render";

interface Props {
  html: string;
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

export const Slideshow: React.FC<Props> = memo(({ html }: Props) => {
  console.log(html);
  return (
    <Container className="slideshow">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
});
