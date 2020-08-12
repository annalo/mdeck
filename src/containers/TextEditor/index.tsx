import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {}

export const TextEditor = memo((props: Props) => {
  return (
    <Div>
      <textarea></textarea>
    </Div>
  );
});

const Div = styled.div``;
