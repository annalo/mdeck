import styled, { css } from "styled-components";

const iconAnimation = css`
  transition: 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const BasicIcon = styled.div`
  svg {
    ${iconAnimation}
  }
`;

const Icon = styled.div`
  svg {
    fill: ${(props) => props.theme.colorScheme.lightgrey};
    circle,
    path {
      stroke: ${(props) => props.theme.colorScheme.grey};
    }

    ${iconAnimation}

    &:hover {
      fill: ${(props) => props.theme.colorScheme.silver};
      circle,
      path {
        stroke: ${(props) => props.theme.textColor};
      }
    }
  }
`;

const IconWithTooltip = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    svg {
      transition: opacity 0.4s ease-in-out;
      opacity: 0.3;
      transform: none;
    }
  }
`;

export { BasicIcon, Icon, IconWithTooltip, iconAnimation };
