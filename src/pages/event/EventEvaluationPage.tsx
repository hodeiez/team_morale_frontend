import { Box, Grid, Layer, ResponsiveContext, Text } from "grommet";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch2 } from "../../commons/hooks/useFetch";
import { EvaluationCard } from "../../components/evaluation/EvaluationCard";
import { EvaluationForm } from "../../components/evaluation/EvaluationForm";
import * as Address from "../../commons/api/apiConstants";
import { Evaluation } from "../../components/evaluation/EvaluationTypes";
import * as Tools from "../../commons/utils";
import { getBearer } from "../../commons/auth/Auth";

export const EventEvaluationPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState<Evaluation[]>([]);
  const { userTeamId, teamName } = location.state as any;
  const size = useContext(ResponsiveContext);

  const { state } = useFetch2(Address.getMyTeamsToday(userTeamId), {
    headers: { Authorization: getBearer() },
  });

  const data: Evaluation[] = Tools.useEventSource(
    Address.getEvent({
      userTeamId: userTeamId,
      auth: getBearer(),
    })
  );
  useEffect(() => {
    setUsers(state.post);
  }, [state]);

  if (!data) {
    return <p>"nothing here!"</p>;
  }
  return (
    <Box pad="medium">
      <Text
        alignSelf="center"
        size="2xl"
        weight="bolder"
        style={{
          marginBottom: "20px",
        }}
      >
        {teamName}
      </Text>
      <Grid
        style={{ marginBottom: "150px" }}
        columns={size !== "small" ? "small" : "100%"}
        gap="small"
      >
        {Tools.mergeArrays(users, data).map((val: any) => {
          return (
            <>
              <EvaluationCard key={val.id + val.name} evaluation={val} />
            </>
          );
        })}
      </Grid>
      <Layer
        full="horizontal"
        responsive={false}
        modal={false}
        position="bottom"
        background="accent-4"
      >
        <EvaluationForm userTeamId={userTeamId} />
      </Layer>
    </Box>
  );
};
