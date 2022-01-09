import { Anchor, Box, Tip } from "grommet";
import * as S from "./styled";
import * as Icons from "grommet-icons";
import { AuthContext } from "../../commons/auth/AuthContext";
import { useContext } from "react";

export function NavBar() {
  const { dispatch } = useContext(AuthContext);
  return (
    <Box style={{ marginBottom: "100px" }}>
      <S.NavBar direction="row" background="accent-4" pad="medium">
        <Tip content="Profile">
          <Anchor icon={<Icons.User color="black" />} href="/profile" />
        </Tip>
        <Tip content="Teams">
          <Anchor icon={<Icons.Group color="black" />} href="/teams" />
        </Tip>
        <Tip content="Logout">
          <Anchor
            alignSelf="end"
            margin="auto"
            style={{ marginRight: "0px" }}
            icon={<Icons.Logout color="black" />}
            onClick={() => dispatch({ type: "LOGOUT", auth: false })}
            href="/"
          />
        </Tip>
      </S.NavBar>
    </Box>
  );
}
