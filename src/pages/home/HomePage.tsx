import { Header, Grid, ResponsiveContext, Main, Text, Box } from "grommet";
import { useContext } from "react";
import { AccordionContainer } from "../../commons/components/AccordionContainer/AccordionContainer";
import { LoginForm } from "../../components/login/LoginForm";
export const HomePage = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box background="#f0dcc9">
      <Header align="center" pad="large" background="light">
        <Text alignSelf="center" margin="auto" size="4xl">
          The Team Morale
        </Text>
      </Header>
      <Main pad="large">
        <Grid
          pad="medium"
          columns={size !== "small" ? "40%" : "100%"}
          gap="medium"
        >
          <AccordionContainer
            name="Login"
            children={<LoginForm color="accent-4" />}
            color="accent-4"
          />
          <AccordionContainer name="Sign Up" color="status-warning" />
        </Grid>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          About
          <br />
          Team morale is a service to track and analyze the morale of a team by
          getting inputs from their daily stand ups. The users can sign up and
          create teams. Then, every team can meet up digitally and register
          their status of that day (energy level, productivity level and
          well-being level).When the teams meet up in a "room" they can see
          others status (this is the real time effect). All users will get other
          users registered updates instantly when they are in the room.
        </div>
      </Main>
    </Box>
  );
};
