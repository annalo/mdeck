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
    circle,
    path {
      stroke: ${(props) => props.theme.iconColor};
    }

    ${iconAnimation}
  }
`;

const Icon = styled(BasicIcon)`
  svg {
    ${iconAnimation}

    &:hover {
      fill: ${(props) => props.theme.iconColor};
    }
  }
`;

const IconWithTooltip = styled(Icon)`
  &:hover {
    svg {
      transition: opacity 0.4s ease-in-out;
      opacity: 0.5;
      transform: none;
    }
  }
`;

export { BasicIcon, Icon, IconWithTooltip, iconAnimation };
