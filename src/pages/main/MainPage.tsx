import { Box, Grid, Text } from "grommet";
import { useEffect, useState } from "react";
//import { useContext } from "react";
import { getUser } from "../../commons/auth/Auth";
import { useFetch2 } from "../../commons/hooks/useFetch";
//import { AuthContext } from "../../commons/auth/AuthContext";

export const MainPage = () => {
  const [quote, setQuote] = useState<any>();
  const { state } = useFetch2("https://type.fit/api/quotes");
  useEffect(() => {
    //const fetched = state.post;
    const selected = state.post[Math.floor(Math.random() * state.post.length)];
    setQuote(selected);
  }, [state]);

  return (
    <Grid pad="50px">
      <Box
        background="white"
        round
        align="center"
        style={{ marginTop: "10px" }}
        pad="20px"
      >
        <Text size="large">Welcome {getUser().username}</Text>
        <Text>Is it your first time?</Text>
        <Text alignSelf="center" size="small">
          In the upper menu you can go to your profile or to the teams page.
        </Text>
        <Text alignSelf="center" size="small">
          In your profile you can check your personal stats or edit your info.
        </Text>
        <Text textAlign="center" alignSelf="center" size="small">
          When you go to the teams page you can create a team, check its details
          and edit or go to Live meeting.
        </Text>
      </Box>
      {!state.loading && !state.error && quote ? (
        <Box
          background="rgba(255,255,255,0.6)"
          round
          align="center"
          style={{ marginTop: "40px" }}
          pad="20px"
        >
          <Text
            textAlign="center"
            alignSelf="center"
            size="large"
            style={{ fontFamily: "Lucida Console" }}
          >
            {quote.text}
          </Text>
          <Text alignSelf="center">{quote.author}</Text>
        </Box>
      ) : (
        <></>
      )}
    </Grid>
  );
};
