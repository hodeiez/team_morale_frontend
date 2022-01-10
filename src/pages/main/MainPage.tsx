import { Box, Grid, Text } from "grommet";
//import { useContext } from "react";
import { getUser } from "../../commons/auth/Auth";
//import { AuthContext } from "../../commons/auth/AuthContext";

export const MainPage = () => {
  // const { state } = useContext(AuthContext);
  return (
    <Grid>
      <Box align="center">
        <Text>Welcome {getUser().username}</Text>
      </Box>
    </Grid>
  );
};
