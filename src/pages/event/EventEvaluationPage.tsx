import { Box, Grid, Layer, ResponsiveContext, Text } from "grommet";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch, useFetch2 } from "../../commons/hooks/useFetch";
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

  const { state } = useFetch2(Address.getMyTeamsToday(userTeamId));

  const data: Evaluation[] = Tools.useEventSource(
    Address.getEvent({
      userTeamId: userTeamId,
    })
  );
  useEffect(() => {
    setUsers(Tools.mergeArrays(state.post, data));
  }, [state]);

  if (!data) {
    return <p>"nothing here!"</p>;
  }
  return (
    <Box pad="medium">
      from event{JSON.stringify(data)}
      <br></br>
      from users, mixed event and data {JSON.stringify(users)}
      {/*   {JSON.stringify(apiData)} */}
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
        {Tools.mergeArrays(users, data).map((val: any) => {
          return <EvaluationCard key={val.id} evaluation={val} />;
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
