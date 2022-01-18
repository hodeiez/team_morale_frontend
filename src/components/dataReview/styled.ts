import styled from "styled-components";
import { Box } from "grommet";

type BoxProps = {
  direction?: string;
  gap?: string;
  alignSelf?: string;
  margin?: string;
  width?: string;
};
export const MaxMinTextBox = styled(Box).attrs<BoxProps>({
  direction: "row",
  gap: "large",
  alignSelf: "center",
})``;
export const RowBox = styled(Box).attrs<BoxProps>({
  direction: "row",
  gap: "large",
  alignSelf: "center",
  margin: "large",
  width: "100%",
})``;
