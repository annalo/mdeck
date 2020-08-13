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
