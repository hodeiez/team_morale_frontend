import { Box, Button, Form, FormField, TextInput } from "grommet";
import { useState, useCallback } from "react";
import { MemberField } from "./MemberField";
import { useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import * as Address from "../../commons/api/apiConstants";
import { getBearer, getUser } from "../../commons/auth/Auth";
import * as N from "../../commons/components/Notifications";

type Team = {
  id: number;
  name: string;
  members: string[];
};

export const CreateTeamForm = () => {
  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({
    url: Address.createTeamWithEmails(),
  });
  const [member, setMember] = useState(0);

  const [team, setTeam] = useState({});

  const setupPost = useCallback((team: any) => {
    setTeam({
      name: team.teamName,
      members: Object.keys(team)
        .filter((key) => key.startsWith("email"))
        .map((a) => team[a]),
    });
  }, []);

  const addMember = useCallback(() => {
    setMember(member + 1);
  }, [member]);

  const submit = async (e: any) => {
    e.preventDefault();
    await execute({
      url: Address.createTeamWithEmails(),
      method: "POST",
      body: team,
      headers: { Authorization: getBearer() },
    });
  };
  return (
    <Form onChange={setupPost} onSubmit={submit}>
      <FormField name="name" label="Team name">
        <TextInput id="name-input" name="teamName" placeholder="Team name" />
      </FormField>
      <Box
        direction="row"
        gap="medium"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          label="addUser"
          color="accent-4"
          primary
          style={{ height: "50%", alignSelf: "flex-end" }}
          onClick={addMember}
        />
      </Box>
      {member !== 0 &&
        Array.from({ length: member }, (_, i) => i).map((id) => (
          <MemberField key={id} id={id} />
        ))}
      <Box pad="large" style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" color="accent-4" label="Submit" primary />
      </Box>
      {serverError ? <N.Error message={serverError} /> : <></>}
      {apiData ? (
        <N.Success
          message={
            (apiData! as Team).name +
            "created with " +
            (apiData! as Team).members +
            " members"
          }
        />
      ) : (
        <></>
      )}
    </Form>
  );
};
