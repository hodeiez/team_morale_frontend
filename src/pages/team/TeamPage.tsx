import { Box } from "grommet";
import * as GS from "../../commons/styles/styles";
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
      <GS.Title2>{teamName}</GS.Title2>

      <Box background="light-1" round style={{ marginBottom: "40px" }}>
        <AccordionContainer
          color="status-ok"
          name="Edit team"
          children={
            <EditTeamForm
              members={state.post.members}
              name={state.post.name}
              membersEmail={state.post.membersEmail}
              userTeamId={userTeamId}
              teamId={id}
            />
          }
        />
      </Box>
      <GS.Title2>Stats</GS.Title2>
      <Box
        round
        alignSelf="center"
        style={{
          marginBottom: "40px",
        }}
        width={"100%"}
      >
        <LineGraph id={id} />
      </Box>
      <Box style={{ marginBottom: "40px" }}></Box>
    </Box>
  );
};
