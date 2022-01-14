import { Box, Text } from "grommet";

import { useLocation } from "react-router-dom";
import { AccordionContainer } from "../../commons/components/AccordionContainer/AccordionContainer";
import { useFetch2 } from "../../commons/hooks/useFetch";
import { LineGraph } from "../../components/graph/LineGraph";
import { EditTeamForm } from "../../components/team/EditTeamForm";
import { oneTeam } from "../../commons/api/apiConstants";
export const TeamPage = () => {
  const location = useLocation();

  const { userTeamId, id, teamName } = location.state as any;
  const { state } = useFetch2(oneTeam(id));
  return (
    <Box margin="10%">
      <Text
        size="2xl"
        alignSelf="center"
        weight="bolder"
        style={{ marginBottom: "40px" }}
      >
        {teamName}
      </Text>
      <Box background="light-1" round style={{ marginBottom: "40px" }}>
        <AccordionContainer
          color="status-ok"
          name="Edit team"
          children={
            <EditTeamForm
              members={state.post.members}
              name={state.post.name}
              membersEmail={state.post.membersEmail}
            />
          }
        />
      </Box>
      <Box
        background="white"
        round
        alignSelf="center"
        style={{ marginBottom: "40px" }}
        width={"100%"}
      >
        <Text alignSelf="center" size="large">
          Stats
        </Text>
        <LineGraph id={id} />
      </Box>
      <Box style={{ marginBottom: "40px" }}></Box>
    </Box>
  );
};
