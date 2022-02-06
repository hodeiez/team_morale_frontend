import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginFormTemplate } from "../../commons/components/LoginFormTemplate/LoginFormTemplate";
import { useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import { UserCreds } from "../../components/login/LoginForm";
import * as Address from "../../commons/api/apiConstants";
import { Box, Text, Button } from "grommet";
export const ForgotPass = () => {
  const [params] = useSearchParams();
  const history = useNavigate();
  const [userCreds, setUserCreds] = useState<UserCreds | any>({});
  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({});
  const update = useCallback((user: any) => {
    setUserCreds(user);
  }, []);
  const submit = async (e: any) => {
    e.preventDefault();

    await execute({
      url: Address.resetPass(),
      method: "POST",
      body: { ...userCreds },
      headers: {
        Accept: "*",
        Type: "application/json",
        Authorization: "Bearer " + params.get("token"),
      },
    });
  };

  return (
    <>
      {!isLoading && apiData ? (
        <Box
          alignSelf="center"
          alignContent="center"
          align="center"
          style={{ marginTop: "30px" }}
        >
          <Text>Password updated click here to login</Text>
          <Button
            onClick={() => history("/")}
            color="accent-4"
            primary
            margin="medium"
            label="go to login"
          ></Button>
        </Box>
      ) : (
        <LoginFormTemplate
          update={update}
          serverError={serverError}
          submit={submit}
          color={"accent-4"}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
