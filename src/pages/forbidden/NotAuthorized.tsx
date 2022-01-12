import { Box, Grid, Text, Button } from "grommet";

export const NotAuthorized = () => {
  // const { state } = useContext(AuthContext);
  return (
    <Grid>
      <Box align="center" style={{ marginTop: "200px" }}>
        <Text margin="30px" textAlign="center">
          uops!! You are not authorized, please Login or Sign up to enjoy the
          Team Morale web
        </Text>
        <br></br>
        <Button
          size="large"
          href="/"
          primary
          margin="100px"
          style={{ padding: "20px" }}
          color="status-error"
        >
          To Home Page
        </Button>
      </Box>
    </Grid>
  );
};
