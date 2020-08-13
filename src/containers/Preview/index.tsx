import React, { memo } from "react";
import styled from "styled-components/macro";

interface Props {
  html: string;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
`;

const PreviewBox = styled.div`
  overflow: scroll;
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

export const Preview: React.FC<Props> = memo(({ html }: Props) => (
  <Container>
    <PreviewBox
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  </Container>
));
