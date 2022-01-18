import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Main,
  ResponsiveContext,
  Text,
  TextInput,
} from "grommet";
import * as S from "./styled";
import * as GS from "../../commons/styles/styles";
import { useCallback, useContext, useEffect, useState } from "react";
import { getUser, updateUserName } from "../../commons/auth/Auth";
import { useFetch2, useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import {
  getMyStats,
  updateMe,
  updatePassword,
} from "../../commons/api/apiConstants";
import { LineGraph } from "../../components/graph/LineGraph";
import * as N from "../../commons/components/Notifications";
import { MaxAndMin } from "../../components/dataReview/MaxAndMin";

export const ProfilePage = () => {
  const size = useContext(ResponsiveContext);
  const [stats, setStats] = useState<any>();
  const { state } = useFetch2(getMyStats(), {
    headers: { Authorization: getUser().email },
  });
  const [userName, setUserName] = useState<any>({});
  const [userPass, setUserPass] = useState<any>({});
  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({});

  const setUpNewName = useCallback((username: any) => {
    setUserName(username);
  }, []);

  const sendUpdatedName = async (e: any) => {
    e.preventDefault();
    await execute({
      url: updateMe(),
      body: userName,
      method: "POST",
      headers: { Authorization: getUser().email },
    });
  };
  const setUpNewPassword = useCallback((pass: any) => {
    setUserPass(pass);
  }, []);
  const sendUpdatedPass = async (e: any) => {
    e.preventDefault();
    await execute({
      url: updatePassword(),
      body: userPass,
      method: "POST",
      headers: { Authorization: getUser().email },
    });
  };

  useEffect(() => {
    if (!state.loading) setStats(state.post);
  }, [state, setStats]);

  useEffect(() => {
    apiData && updateUserName(userName);
  }, [apiData]);

  return (
    <Box>
      <GS.Title2>Personal details</GS.Title2>
      <Grid
        pad="medium"
        columns={size !== "small" ? "40%" : "100%"}
        gap="medium"
      >
        <Box align="center">
          <GS.Title4>About me</GS.Title4>
          <Form onChange={setUpNewName} onSubmit={sendUpdatedName}>
            <FormField name="username" required>
              <TextInput
                id="username-input"
                name="username"
                defaultValue={getUser().username}
              />
            </FormField>
            <Box margin={"23px"}>
              <Text>{getUser().email}</Text>
            </Box>
            <S.BoxForButton>
              <Button type="submit" color="accent-4" label="Update" primary />
            </S.BoxForButton>
          </Form>
        </Box>
        <Box align="center">
          <GS.Title4>Update password</GS.Title4>
          <Form onChange={setUpNewPassword} onSubmit={sendUpdatedPass}>
            <FormField name="oldPassword" required>
              <TextInput
                id="oldPassword"
                name="oldPassword"
                placeholder="old pass here"
                type="password"
              />
            </FormField>
            <FormField name="password">
              <TextInput
                id="password"
                name="password"
                placeholder="new pass here"
                type="password"
              />
            </FormField>
            <S.BoxForButton>
              <Button
                type="submit"
                color="accent-4"
                label="Update Pass"
                primary
              />
            </S.BoxForButton>
          </Form>
        </Box>
      </Grid>
      <GS.Title2>STATS</GS.Title2>
      <Box margin="large">
        {stats && !state.error && (
          <LineGraph
            data={stats.evaluationCalculations}
            id={stats.maxMinCalculations.userId}
          />
        )}
      </Box>
      <Box margin="large" align="center">
        {stats && !state.error && <MaxAndMin data={stats.maxMinCalculations} />}
      </Box>
      {apiData && <N.Success message="updated!" />}
      {state.error && <N.Error message={state.error} />}
      {serverError && <N.Error message={serverError} />}
      {/*  {apiData && <N.MyToaster message="updated!" />}
      {state.error && <N.MyToaster message={state.error} />}
      {serverError && <N.MyToaster message={serverError} />} */}
    </Box>
  );
};
