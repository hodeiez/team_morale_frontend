import { Box } from "grommet";
import styled from "styled-components";

type BoxProps = {
  pad: string;
};

export const BoxForButton = styled(Box).attrs<BoxProps>({ pad: "large" })`
  justify-content: "center";
  display: "flex";
`;
