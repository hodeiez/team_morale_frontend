import { Box, Button, Form, Text, FormField, TextInput } from "grommet";
import { useCallback, useState } from "react";
import { useFetchCallback } from "./../../commons/hooks/useFetch";
import { login } from "../../commons/api/apiConstants";

type UserCreds = {
  email: string;
  password: string;
};
export const LoginForm = (props: any) => {
  const [userCreds, setUserCreds] = useState<UserCreds | any>({});
  const update = useCallback((user: any) => {
    setUserCreds(user);
  }, []);

  const { isLoading, serverError, apiData, execute } = useFetchCallback(
    "POST",
    login(),
    { ...userCreds },
    { Accept: "application/json", Type: "application/json" }
  );
  const submit = (e: any) => {
    e.preventDefault();
    execute(e);
  };

  return (
    <Box align="center" pad="small">
      <Form onChange={update} onSubmit={submit}>
        <FormField name="email" htmlFor="email" label="Email" required>
          <TextInput id="email" name="email" type="email" />
        </FormField>

        <FormField name="password" htmlFor="password" label="Password" required>
          <TextInput id="password" name="password" type="password" />
        </FormField>

        <Button type="submit" label="Submit" primary color={props.color} />

        <Text
          margin={{ left: "small" }}
          size="small"
          color="status-critical"
        ></Text>
      </Form>
      {JSON.stringify(apiData)}
      {JSON.stringify(isLoading)}
      {JSON.stringify(serverError)}
    </Box>
  );
};
