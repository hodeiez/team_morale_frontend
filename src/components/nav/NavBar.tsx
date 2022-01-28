import { Anchor, Text, Box, Tip } from "grommet";
import * as S from "./styled";
import * as Icons from "grommet-icons";

export function NavBar(props: any) {
  return (
    <Box style={{ marginBottom: "100px", position: "relative", zIndex: 1 }}>
      <S.NavBar direction="row" background="accent-4" pad="medium">
        <Tip content="Profile">
          <Anchor icon={<Icons.User color="black" />} href="/profile" />
        </Tip>
        <Tip content="Teams">
          <Anchor icon={<Icons.Group color="black" />} href="/teams" />
        </Tip>
        <Text
          weight="bolder"
          size="large"
          alignSelf="center"
          margin="auto"
          style={{ marginRight: "0px" }}
        >
          {props.username}
        </Text>
        <Tip content="Logout">
          <Anchor
            alignSelf="end"
            margin="auto"
            style={{ marginRight: "0px" }}
            icon={<Icons.Logout color="black" />}
            href="/"
          />
        </Tip>
      </S.NavBar>
    </Box>
  );
}
