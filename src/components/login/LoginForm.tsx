import { useCallback, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCallback } from "./../../commons/hooks/useFetch";
import { login } from "../../commons/api/apiConstants";
import { AuthContext } from "../../commons/auth/AuthContext";

import { LoginFormTemplate } from "../../commons/components/LoginFormTemplate/LoginFormTemplate";
export type UserCreds = {
  email: string;
  password: string;
};
export const LoginForm = (props: any) => {
  const history = useNavigate();

  const { state, dispatch } = useContext(AuthContext);

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
    <LoginFormTemplate
      update={update}
      serverError={serverError}
      submit={submit}
      color={props.color}
      isLoading={isLoading}
    />
  );
};
