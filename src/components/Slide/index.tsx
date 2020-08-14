/**
 *
 * Slide component has an aspect ratio of 16:9
 *
 */

import React, { memo } from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  position: relative;
  &:before {
    background-color: red;
    display: block;
    content: "";
    width: 100%;
    padding-top: calc((9 / 16) * 100%);
  }
  > .inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const Slide: React.FC = memo(() => {
  return <Container />;
});
