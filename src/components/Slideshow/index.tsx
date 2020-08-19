import React, { memo } from "react";
import styled from "styled-components/macro";
import { render } from "utils/render";

interface Props {
  html: string;
}
const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Slideshow: React.FC<Props> = memo(({ html }: Props) => {
  return <Container className="slideshow">{render(html)}</Container>;
});
