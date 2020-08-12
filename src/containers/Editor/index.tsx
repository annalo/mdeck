/**
 *
 * Editor
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';

interface Props {}

export const Editor = memo((props: Props) => {
  return (
    <>
      <Helmet>
        <title>Editor</title>
        <meta name="description" content="Description of Editor" />
      </Helmet>
      <Div>
        <textarea></textarea>
      </Div>
    </>
  );
});

const Div = styled.div``;
