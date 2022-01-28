import { Box } from "grommet";
import styled from "styled-components";

type BoxProps = {
  pad: string;
};

export const BoxForButton = styled(Box).attrs<BoxProps>({ pad: "large" })`
  justify-content: "center";
  display: "flex";
`;
export const BoxForRemoveMe = styled(Box).attrs<BoxProps>({ pad: "medium" })`
  justify-content: "center";
  display: "flex";
  padding-left: 30%;
  padding-right: 30%;
`;
