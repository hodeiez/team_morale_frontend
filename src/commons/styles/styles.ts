import styled from "styled-components";
import { Text } from "grommet";

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

/* <Text alignSelf="center" size="2xl" weight="bolder">
        Stats
      </Text> */
