import { Box, Button, Form, Text, FormField, TextInput } from "grommet";
import { useCallback, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCallback } from "./../../commons/hooks/useFetch";
import { signUp } from "../../commons/api/apiConstants";
import { AuthContext } from "../../commons/auth/AuthContext";
type UserSignUp = {
  email: string;
  password: string;
  username: string;
};
export const SignUp = (props: any) => {
  const history = useNavigate();

  const { state, dispatch } = useContext(AuthContext);

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
  useEffect(() => {
    state.auth ? history("/main") : history("");
  }, [state]);

  useEffect(() => {
    !isLoading && apiData
      ? dispatch({
          type: "LOGIN",
          user: { ...(apiData as any) },
          token: "string",
          auth: true,
        })
      : dispatch({ type: "LOGOUT", auth: false });
  }, [isLoading, apiData]);

  return (
    <Box align="center" pad="small">
      <Form onChange={update} onSubmit={submit}>
        <FormField name="username" htmlFor="username" label="Username" required>
          <TextInput id="username" name="username" type="text" />
        </FormField>
        <FormField name="email" htmlFor="email" label="Email" required>
          <TextInput id="email" name="email" type="email" />
        </FormField>

        <FormField name="password" htmlFor="password" label="Password" required>
          <TextInput id="password" name="password" type="password" />
        </FormField>

        <Button type="submit" label="Submit" primary color={props.color} />

        <br></br>
        <Text margin={{ left: "small" }} size="small" color="status-critical">
          {serverError}
        </Text>
      </Form>
    </Box>
  );
};
