import { Box, Grid, ResponsiveContext, Text } from "grommet";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { EvaluationCard } from "../../components/evaluation/EvaluationCard";

export const EventEvaluationPage = () => {
  const location = useLocation();
  const { userTeamId, id, teamName } = location.state as any;
  const size = useContext(ResponsiveContext);
  return (
    <Box pad="medium">
      <Text alignSelf="center" size="2xl" weight="bolder">
        {teamName}
      </Text>
      <p>
        event page with userTeamId {userTeamId} and teamId {id}
      </p>
      <Grid columns={size !== "small" ? "small" : "100%"} gap="small">
        <EvaluationCard
          evaluation={{
            id: "1",
            username: "username",
            energy: 5,
            production: 7,
            well_being: 6,
            team: "team-name",
            date: "date",
          }}
        />
      </Grid>
    </Box>
  );
};
