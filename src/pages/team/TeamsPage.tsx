import { Text, Box, Grid, ResponsiveContext } from "grommet";
import { useContext } from "react";
import { getUser } from "../../commons/auth/Auth";
import { AccordionContainer } from "../../commons/components/AccordionContainer/AccordionContainer";
import { useFetch } from "../../commons/hooks/useFetch";
import { CreateTeamForm } from "../../components/team/CreateTeamForm";
import { TeamCard } from "../../components/team/TeamCard";
import * as Address from "../../commons/api/apiConstants";
import { LoadingTeamCard } from "../../components/loading/LoadingTeamCard";
import * as N from "../../commons/components/Notifications";
export const TeamsPage = () => {
  const { apiData, serverError } = useFetch("GET", Address.myTeams(), null, {
    Authorization: getUser().email,
  });
  const size = useContext(ResponsiveContext);
  return (
    <Box>
      <AccordionContainer
        name="Create a Team"
        color="neutral-3"
        children={<CreateTeamForm />}
      />
      <Text
        style={{ marginTop: "30px" }}
        weight="bolder"
        size="2xl"
        alignSelf="center"
      >
        YOUR TEAMS
      </Text>
      <Grid
        pad="medium"
        columns={size !== "small" ? "23%" : "100%"}
        gap="medium"
      >
        {!apiData ? (
          !serverError ? (
            Array.from({ length: 20 }).map((l: any, i: number) => (
              <LoadingTeamCard key={i} />
            ))
          ) : (
            <N.Error message={serverError!.message} />
          )
        ) : (
          apiData!.map((t: any) => (
            <TeamCard
              key={t.userTeamsId}
              userTeamsid={t.userTeamsId}
              name={t.name}
              startDate={t.startDate}
              lastUpdateDate={t.lastUpdateDate}
              members={t.members}
              id={t.id}
            />
          ))
        )}
      </Grid>
    </Box>
  );
};
