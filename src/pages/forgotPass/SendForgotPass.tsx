import { Box, Button, Form, FormField, TextInput, Text } from "grommet";
import { useCallback, useState } from "react";
import Loading from "../../commons/components/Loading/Loading";
import { useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import * as Address from "../../commons/api/apiConstants";
import * as GS from "../../commons/styles/styles";
import * as N from "../../commons/components/Notifications";
export const SendForgotPass = () => {
  const [userEmail, setuserEmail] = useState<string | any>();
  const { apiData, isLoading, serverError, execute } = useFetchPostOrUpdate({});
  const update = useCallback((email: any) => {
    setuserEmail(email.email);
  }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await execute({
      url: Address.sendForgotPass(userEmail),
      method: "GET",
      headers: {
        Accept: "*",
        Type: "application/json",
      },
    });
  };
  return (
    <Box align="center" pad="small">
      <GS.Title2>RESET PASSWORD</GS.Title2>
      <GS.Title4>Type the email you used for your account</GS.Title4>
      <Form onChange={update} onSubmit={submit}>
        <FormField name="email" htmlFor="email" label="Email" required>
          <TextInput id="email" name="email" type="email" />
        </FormField>

        <Button type="submit" label="Submit" primary color="accent-4" />

        <br></br>
        {serverError && !isLoading && (
          <Text margin={{ left: "small" }} size="small" color="status-critical">
            {serverError}
          </Text>
        )}
      </Form>
      <Box height="1px">{isLoading && <Loading />}</Box>
      <Button
        href="/"
        color="accent-4"
        primary
        margin="medium"
        label="False alarm!!, I want to go back to Login"
        style={{ marginTop: "160px" }}
      ></Button>
      {serverError && !isLoading && (
        <N.MyToaster type="ERROR" message={serverError} visible={true} />
      )}

      {apiData && !isLoading && !serverError && (
        <N.MyToaster
          message="Instructions sent to your email!"
          visible={true}
        />
      )}
    </Box>
  );
};
