import { Box, Button, Form, Text, FormField, TextInput, Tip } from "grommet";
import { useCallback, useState } from "react";

import { useFetchCallback } from "./../../commons/hooks/useFetch";
import { signUp } from "../../commons/api/apiConstants";

import Loading from "../../commons/components/Loading/Loading";
import { Info, Tooltip } from "grommet-icons";
type UserSignUp = {
  email: string;
  password: string;
  username: string;
};
export const SignUp = (props: any) => {
  const [userCreds, setUserCreds] = useState<UserSignUp | any>({});

  const update = useCallback((user: any) => {
    setUserCreds(user);
  }, []);

  const { isLoading, serverError, apiData, execute } = useFetchCallback(
    "POST",
    signUp(),
    { ...userCreds },
    { Accept: "application/json", Type: "application/json" }
  );
  const submit = async (e: any) => {
    e.preventDefault();
    await execute(e);
  };

  return (
    <Box align="center" pad="small">
      <Tip
        content={
          <Text size="small" style={{ background: "white" }}>
            password needs at least one lower case,one capital case,a digit, one
            special character(@#$%^&+=-!()¤?*) and must be 8 characters long
          </Text>
        }
      >
        <Info size="small" />
      </Tip>
      {apiData && !isLoading ? (
        <>
          <Text color="status-critical">
            A verification email was sent to {(apiData as UserSignUp).email}
          </Text>
          <Text size="small">
            if you don't see it check on your spams folder
          </Text>
        </>
      ) : (
        <Form onChange={update} onSubmit={submit}>
          <FormField
            name="username"
            htmlFor="username"
            label="Username"
            required
          >
            <TextInput id="username" name="username" type="text" />
          </FormField>
          <FormField name="email" htmlFor="email" label="Email" required>
            <TextInput id="email" name="email" type="email" />
          </FormField>

          <FormField
            name="password"
            htmlFor="password"
            label="Password"
            validate={[
              {
                regexp: new RegExp(
                  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=\\s-!()¤?*])(?=\\S+$).{8,}"
                ),
                message:
                  "at least one lower case,one capital case,a digit, one special character(@#$%^&+=-!()¤?*) and 8 characters long ",
              },
            ]}
            required
          >
            <TextInput id="password" name="password" type="password" />
          </FormField>

          <Button type="submit" label="Submit" primary color={props.color} />

          <br></br>
          <Text margin={{ left: "small" }} size="small" color="status-critical">
            {serverError}
          </Text>
        </Form>
      )}

      <Box height="1px">{isLoading && <Loading />}</Box>
    </Box>
  );
};
