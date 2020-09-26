import React, { memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { useCodeLineEntries } from "contexts/CodeLineObserver";

import { Slide } from "components/Slide/Loadable";

import { usePaneIsActive } from "utils/usePaneIsActive";

import { Slideshow } from "./Slideshow";

import { useMarkdownWorker } from "./useMarkdownWorker";
import { useSyncPreview } from "./useSyncPreview";
import { useTrackPreviewScroll } from "./useTrackPreviewScroll";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Preview = memo(function Preview() {
  const ref = useRef<HTMLElement>(null);

  const dispatch = useMarkdownDispatch();
  const { htmlArray, md, editorLine } = useMarkdownState();

  const isActive = usePaneIsActive({ ref, initialValue: false });
  const entries = useCodeLineEntries();

  useMarkdownWorker({ dispatch, md });
  useSyncPreview({ entries, editorLine });
  useTrackPreviewScroll({ dispatch, entries, isActive, ref });

  return (
    <Container>
      <Slideshow ref={ref} id="slideshow">
        {htmlArray.map((html, i) => (
          <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
        ))}
      </Slideshow>
    </Container>
  );
});

export { Preview };
