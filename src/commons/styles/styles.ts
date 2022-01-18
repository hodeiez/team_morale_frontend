import styled, { keyframes } from "styled-components";
import { Text } from "grommet";
import React from "react";

type TextProps = {
  size?: string;
  weight?: string;
  alignSelf?: string;
};
export const Title2 = styled(Text).attrs<TextProps>({
  size: "2xl",
  alignSelf: "center",
  weight: "bolder",
})`
  margin-bottom: 40px;
  margin-top: 20px;
`;
export const Title4 = styled(Text).attrs<TextProps>({
  size: "medium",
  alignSelf: "center",
  weight: "bolder",
})`
  margin-bottom: 20px;
  margin-top: 10px;
`;
export const colorStyled: ColorsS = {
  energy: "#8884d8",
  production: "#BF3F3F",
  wellBeing: "#82ca9d",
};

type ColorsS = {
  energy: string;
  production: string;
  wellBeing: string;
};
