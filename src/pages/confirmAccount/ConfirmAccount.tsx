import { Box, Text } from "grommet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmAccount } from "../../commons/api/apiConstants";
import { useFetch2 } from "../../commons/hooks/useFetch";
import { Title2, Title4 } from "../../commons/styles/styles";

export const ConfirmAccount = () => {
  const [params] = useSearchParams();
  const history = useNavigate();

  const { state } = useFetch2(confirmAccount(), {
    headers: { Authorization: params.get("token") },
  });

  return (
    <>
      {!state.isLoading && !state.error && state.post && history("/")}
      {state.error && (
        <Box align="center">
          <Title2>An error ocurred with your verification</Title2>
          <Title4>Contact administration ASAP</Title4>
          <Text>superteammorale@gmail.com</Text>
        </Box>
      )}
    </>
  );
};
