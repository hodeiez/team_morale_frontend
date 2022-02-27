import { Header, Grid, ResponsiveContext, Main, Text, Box } from "grommet";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../commons/auth/AuthContext";
import { AccordionContainer } from "../../commons/components/AccordionContainer/AccordionContainer";
import { LoginForm } from "../../components/login/LoginForm";
import { SignUp } from "../../components/signup/SignUp";

export const HomePage = () => {
  const { dispatch } = useContext(AuthContext);
  const size = useContext(ResponsiveContext);
  useEffect(() => {
    dispatch({ type: "LOGOUT", auth: false });
  }, []);
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
          <AccordionContainer
            name="Sign Up"
            color="status-warning"
            children={<SignUp color="status-warning" />}
          />
        </Grid>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>About</h2>
          <p>
            Team morale is a service to track and analyze the morale of a team
            by getting inputs from their daily stand ups. The users can sign up
            and create teams. Then, every team can meet up digitally and
            register their status of that day (energy level, productivity level
            and well-being level).When the teams meet up in a "room" they can
            see others status. All users will get other users registered updates
            instantly when they are in the room.
          </p>
          <p>
            This is a{" "}
            <strong style={{ color: "red" }}>
              demo of my final school project
            </strong>
            , you can register using an email (the address will be used to
            confirm the account) or, you can visit the{" "}
            <a href="https://github.com/hodeiez/final_project">project Repo</a>{" "}
          </p>
        </div>
      </Main>
    </Box>
  );
};
