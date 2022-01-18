import { Text, Box, Grid, ResponsiveContext } from "grommet";
import * as I from "grommet-icons";
import { useContext } from "react";
import * as S from "./styled";
import * as GS from "../../commons/styles/styles";
export const MaxAndMin = (props: any) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      pad="medium"
      columns={size !== "small" ? "30%" : "100%"}
      gap="medium"
      width="100%"
    >
      {size !== "small" ? (
        <S.RowBox margin="0px" pad="0px">
          <Box style={{ marginTop: "50px" }}>
            <Text>Production</Text>
            <Text>Energy</Text>
            <Text>Well-Being</Text>
          </Box>
        </S.RowBox>
      ) : null}
      <Box margin="auto">
        <S.RowBox>
          <I.CaretUp color="green"></I.CaretUp>
          <Box>
            <GS.Title4>Max values</GS.Title4>
            <Texts
              value={props.data.maxProduction}
              text={props.data.maxProductionTeamName}
              color={GS.colorStyled.production}
            />
            <Texts
              value={props.data.maxEnergy}
              text={props.data.maxEnergyTeamName}
              color={GS.colorStyled.energy}
            />
            <Texts
              value={props.data.maxWellBeing}
              text={props.data.maxWellBeingTeamName}
              color={GS.colorStyled.wellBeing}
            />
          </Box>
        </S.RowBox>
      </Box>
      <Box margin="auto">
        <S.RowBox>
          <I.CaretDown color="red"></I.CaretDown>
          <Box>
            <GS.Title4>Min values</GS.Title4>
            <Texts
              value={props.data.minProduction}
              text={props.data.minProductionTeamName}
              color={GS.colorStyled.production}
            />
            <Texts
              value={props.data.minEnergy}
              text={props.data.minEnergyTeamName}
              color={GS.colorStyled.energy}
            />
            <Texts
              value={props.data.minWellBeing}
              text={props.data.minWellBeingTeamName}
              color={GS.colorStyled.wellBeing}
            />
          </Box>
        </S.RowBox>
      </Box>
    </Grid>
  );
};
const Texts = (props: any) => {
  return (
    <S.MaxMinTextBox>
      <Text color={props.color}>{props.text}</Text>
      <Text color={props.color}>{props.value}</Text>
    </S.MaxMinTextBox>
  );
};
