import { Text, CardFooter, Card, CardBody, CardHeader } from "grommet";

import * as S from "./styled";
import { useRandomColorCard, greyPalleteColors } from "../../commons/utils";

export const LoadingTeamCard = (props: any) => {
  return (
    <S.Container>
      <Card
        height="small"
        pad="small"
        background={useRandomColorCard(greyPalleteColors)}
      >
        <CardHeader
          background="rgba(0, 0, 0, 0.1)"
          alignSelf="center"
          pad="large"
          width="100%"
          round="25px"
        >
          <Text weight="bold" color="white" alignSelf="center"></Text>
        </CardHeader>
        <CardBody alignSelf="center"></CardBody>

        <Text size="small" alignSelf="center"></Text>
        <CardFooter>
          <Text size="small" alignSelf="center"></Text>
          <Text size="small" alignSelf="center"></Text>
        </CardFooter>
      </Card>
    </S.Container>
  );
};
