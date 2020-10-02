import React, { forwardRef, memo, useRef } from "react";
import styled from "styled-components";

import {
  useMarkdownDispatch,
  useMarkdownState,
} from "contexts/MarkdownContext";
import { useCodeLineEntries } from "contexts/CodeLineObserver";
import { useCombinedRefs } from "utils/useCombinedRefs";
import { usePaneIsActive } from "utils/usePaneIsActive";

import { Slide } from "components/Slide/Loadable";
import { Slideshow } from "./Slideshow";

import { useMarkdownWorker } from "./useMarkdownWorker";
import { useSyncPreview } from "./useSyncPreview";
import { useTrackPreviewScroll } from "./useTrackPreviewScroll";

const Column = styled.div`
  background-color: ${(props) => props.theme.previewColor};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const PreviewForwardRefComponent = forwardRef<HTMLElement>(
  (_props, forwardedRef) => {
    const myRef = useRef<HTMLElement>(null);
    const ref = useCombinedRefs(forwardedRef, myRef);

    const dispatch = useMarkdownDispatch();
    const { htmlArray, md, editorLine } = useMarkdownState();

    const isActive = usePaneIsActive({ ref, initialValue: false });
    const entries = useCodeLineEntries();

    useMarkdownWorker({ dispatch, md });
    useSyncPreview({ entries, editorLine });
    useTrackPreviewScroll({ dispatch, entries, isActive, ref });

    return (
      <Column id="preview">
        {md === "" ? null : (
          <Slideshow ref={ref} id="slideshow">
            {htmlArray.map((html, i) => (
              <Slide key={`slide-${i + 1}`} htmlString={html} index={i} />
            ))}
          </Slideshow>
        )}
      </Column>
    );
  }
);
const Preview = memo(PreviewForwardRefComponent);

export { Preview };
