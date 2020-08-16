/* eslint-disable */
/**
 *
 * Slide component has an aspect ratio of 16:9
 *
 */

import React from "react";
import styled from "styled-components/macro";

interface Props {
  children: any;
}

const Container = styled.section`
  height: 0;
  padding-top: calc((9 / 16) * 100%);
  position: relative;
  overflow: hidden;

  margin: 10px;

  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(225, 225, 225, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(225, 225, 225, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(225, 225, 225, 0.75);

  > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

export const Slide: React.FC<Props> = ({ children }: Props) => {
  return (
    <Container className="slide">
      <div>{children}</div>
    </Container>
  );
};
