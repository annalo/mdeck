import React from "react";
import styled from "styled-components/macro";
import { P } from "./P";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

export const NotFoundPage: React.FC = () => {
  return (
    <>
      {/* <Helmet>
        <title>404 Page Not Found</title>
        <meta content="Page not found" name="description" />
      </Helmet> */}
      <Wrapper>
        <Title>
          4
          <span aria-label="Crying Face" role="img">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
      </Wrapper>
    </>
  );
};
