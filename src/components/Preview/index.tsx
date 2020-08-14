import React, { memo } from "react";
import styled from "styled-components/macro";

import { Slideshow } from "components/Slideshow";

interface Props {
  html: string;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
`;

export const Preview: React.FC<Props> = memo(({ html }: Props) => (
  <Container>
    <Slideshow html={html} />
  </Container>
));
