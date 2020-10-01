import styled, { css } from "styled-components";

const iconAnimation = css`
  transition: 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const BasicIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    ${iconAnimation}
  }
`;

const Icon = styled(BasicIcon)`
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
  &:hover {
    svg {
      transition: opacity 0.4s ease-in-out;
      opacity: 0.3;
      transform: none;
    }
  }
`;

export { BasicIcon, Icon, IconWithTooltip, iconAnimation };
