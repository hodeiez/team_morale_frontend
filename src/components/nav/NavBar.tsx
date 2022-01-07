import { Anchor, Box } from "grommet";
import * as S from "./styled";
import * as Icons from "grommet-icons";

export function NavBar() {
  return (
    <Box style={{ marginBottom: "100px" }}>
      <S.NavBar direction="row" background="accent-4" pad="medium">
        <Anchor icon={<Icons.User color="black" />} href="/profile" />
        <Anchor icon={<Icons.Group color="black" />} href="/teams" />
        {/*  <Anchor icon={<Icons.Services color="black" />} href="/manage" />
        <Anchor icon={<Icons.Home color="black" />} href="/" />
        <Anchor icon={<Icons.Workshop color="black" />} href="/event" />
        <Anchor icon={<Icons.LineChart color="black" />} href="/graphs" />
        <Anchor icon={<Icons.Login color="black" />} />
      */}
      </S.NavBar>
    </Box>
  );
}
