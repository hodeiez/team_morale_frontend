import { Box, Grid, Layer, ResponsiveContext, Text } from "grommet";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../commons/hooks/useFetch";
import { EvaluationCard } from "../../components/evaluation/EvaluationCard";
import { EvaluationForm } from "../../components/evaluation/EvaluationForm";
import * as Address from "../../commons/api/apiConstants";
import { Evaluation } from "../../components/evaluation/EvaluationTypes";
import * as Tools from "../../commons/utils";
export const EventEvaluationPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const { userTeamId, id, teamName } = location.state as any;
  const size = useContext(ResponsiveContext);
  const { isLoading, apiData, serverError } = useFetch(
    "GET",
    Address.getMyTeamsToday(userTeamId),
    null,
    {}
  );

  const data: Evaluation[] = Tools.useEventSource(
    Address.getEvent({
      userTeamId: userTeamId,
    })
  );

  return (
    <Box pad="medium">
      {JSON.stringify(data)}
      {JSON.stringify(users)}
      {JSON.stringify(apiData)}
      <Text alignSelf="center" size="2xl" weight="bolder">
        {teamName}
      </Text>
      <p>
        event page with userTeamId {userTeamId} and teamId {id}
      </p>
      <Grid
        style={{ marginBottom: "150px" }}
        columns={size !== "small" ? "small" : "100%"}
        gap="small"
      >
        {!isLoading && apiData ? (
          (apiData! as Evaluation[]).map((e: Evaluation) => {
            <EvaluationCard
              evaluation={{
                id: e.id,
                username: e.username,
                energy: e.energy,
                production: e.production,
                well_being: e.well_being,
                team: e.team,
                date: e.date,
              }}
            />;
          })
        ) : (
          <></>
        )}
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
function useEventSource(arg0: any): Evaluation[] {
  throw new Error("Function not implemented.");
}
