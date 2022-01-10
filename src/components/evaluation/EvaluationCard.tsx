import { FC } from "react";
import { Evaluation } from "./EvaluationTypes";
import { useRandomColorCard } from "../../commons/utils";

import { Chart, Card, CardHeader, CardBody, Text } from "grommet";
type Props = {
  evaluation: Evaluation;
};
const colors = {
  one: "neutral-4",
  two: "neutral-3",
  three: "neutral-2",
  four: "neutral-1",
};

export const EvaluationCard: FC<Props> = ({ evaluation }) => {
  return (
    <Card pad="medium" background={useRandomColorCard(colors)}>
      <CardHeader alignSelf="center" pad="medium">
        <Text> {evaluation.username}</Text>
      </CardHeader>
      <CardBody alignSelf="center">
        <Chart
          bounds={[
            [0, 2],
            [0, 10],
          ]}
          size={{ height: "xsmall", width: "xsmall" }}
          type="bar"
          values={[
            {
              value: [0, evaluation.energy],
              thickness: "large",
              color: "status-critical",
            },
            {
              value: [2, evaluation.well_being],
              thickness: "large",
              color: "status-ok",
            },
            {
              value: [1, evaluation.production],
              thickness: "large",
              color: "status-warning",
            },
          ]}
        />
      </CardBody>
    </Card>
  );
};
