import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';

import { TextEditor } from 'containers/TextEditor/Loadable';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A minimal, markdown-based presentation tool."
        />
      </Helmet>
      <Div>
        mdeck
        <TextEditor />
      </Div>
    </>
  );
}

const Div = styled.div``;
