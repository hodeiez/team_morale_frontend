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
import { useContext, useEffect, useState } from "react";
import { getUser } from "../../commons/auth/Auth";
import { useFetch2 } from "../../commons/hooks/useFetch";
import { getMyStats } from "../../commons/api/apiConstants";
import { LineGraph } from "../../components/graph/LineGraph";
import * as N from "../../commons/components/Notifications";

export const ProfilePage = () => {
  const [stats, setStats] = useState<any>();
  const { state } = useFetch2(getMyStats(), {
    headers: { Authorization: getUser().email },
  });
  useEffect(() => {
    if (!state.loading) setStats(state.post);
  }, [state, setStats]);
  const size = useContext(ResponsiveContext);
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
          <Form onChange={() => {}} onSubmit={() => {}}>
            <FormField name="username">
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
          <Form onChange={() => {}} onSubmit={() => {}}>
            <FormField name="old-pass">
              <TextInput
                id="old-pass"
                name="old-pass"
                placeholder="old pass here"
                type="password"
              />
            </FormField>
            <FormField name="new-pass">
              <TextInput
                id="new-pass"
                name="new-pass"
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

      {stats && !state.error && (
        <LineGraph
          data={stats.evaluationCalculations}
          id={stats.maxMinCalculations.userId}
        />
      )}
      {state.error && <N.Error message={state.error} />}
    </Box>
  );
};
