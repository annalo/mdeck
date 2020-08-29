import React from "react";
// import styled from "styled-components";

// const Wrapper = styled.div`
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   min-height: 320px;
// `;

// const Title = styled.div`
//   margin-top: -8vh;
//   font-weight: bold;
//   color: black;
//   font-size: 3.375rem;

//   span {
//     font-size: 3.125rem;
//   }
// `;

// export const P = styled.p`
//   font-size: 1rem;
//   line-height: 1.5;
//   color: black;
//   margin: 0.625rem 0 1.5rem 0;
// `;

export const NotFoundPage: React.FC = () => {
  return (
    <>
      {/* <Helmet>
        <title>404 Page Not Found</title>
        <meta content="Page not found" name="description" />
      </Helmet> */}
      <div>
        <h2>
          4
          <span aria-label="Crying Face" role="img">
            😢
          </span>
          4
        </h2>
        <p>Page not found.</p>
      </div>
    </>
  );
};
