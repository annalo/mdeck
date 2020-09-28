import React, { forwardRef, memo } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { useCodeLineEntries } from "contexts/CodeLineObserver";
import { usePaneIsActive } from "utils/usePaneIsActive";

import { Slide } from "components/Slide/Loadable";
import { Slideshow } from "./Slideshow";

import { useMarkdownWorker } from "./useMarkdownWorker";
import { useSyncPreview } from "./useSyncPreview";
import { useTrackPreviewScroll } from "./useTrackPreviewScroll";
import { usePresentation } from "./usePresentation";

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Preview = memo(
  forwardRef<HTMLElement>(function Preview(_props, ref) {
    const dispatch = useMarkdownDispatch();
    const { htmlArray, md, editorLine } = useMarkdownState();

    const isActive = usePaneIsActive({ ref, initialValue: false });
    const entries = useCodeLineEntries();

    useMarkdownWorker({ dispatch, md });
    useSyncPreview({ entries, editorLine });
    useTrackPreviewScroll({ dispatch, entries, isActive, ref });
    usePresentation(ref);

    return (
      <Column id="preview">
        <Slideshow ref={ref} id="slideshow">
          {htmlArray.map((html, i) => (
            <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
          ))}
        </Slideshow>
      </Column>
    );
  })
);

export { Preview };
