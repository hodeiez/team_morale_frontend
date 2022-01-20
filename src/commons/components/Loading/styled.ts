import styled, { keyframes } from "styled-components";
type DotProps = {
  delay: string;
  color: string;
};
const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 0.5rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;
export const LoadingWrapper = styled.div`
  display: flex;

  align-items: flex-end;
  justify-content: center;
`;
/* styled(Box).attrs<BoxProps>({ pad: "large" })` */
export const Dot = styled.div<DotProps>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
