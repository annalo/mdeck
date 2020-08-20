import React, { memo } from "react";
import styled from "styled-components/macro";
import { Slideshow } from "components/Slideshow";

interface Props {
  html: string;
  setLineNumber(value: number): void;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Preview: React.FC<Props> = ({ html, setLineNumber }: Props) => {
  return (
    <Container>
      <Slideshow html={html} setLineNumber={setLineNumber} />
    </Container>
  );
};

export default memo(Preview);
