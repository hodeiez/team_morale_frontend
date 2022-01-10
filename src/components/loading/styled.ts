import styled from "styled-components";

export const Container = styled.span`
  @keyframes loading {
    0% {
      transform: skewX(-10deg) translateX(-100%);
    }
    100% {
      transform: skewX(-10deg) translateX(200%);
    }
  }
  ::before {
    content: "";
    position: absolute;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    width: 50%;
    height: 100%;
    top: 20;
    left: 0;
    animation: loading 0.6s infinite;
  }
`;
