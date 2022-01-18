import {
  Text,
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  ResponsiveContext,
} from "grommet";

import { useCallback, useContext, useEffect, useState } from "react";
import { MemberField } from "./MemberField";
import * as S from "./styled";
type Props = {
  style?: any;
  members: string[];
  name: string;
  membersEmail: string[];
  userTeamId: number;
};

export const EditTeamForm = (props: Props) => {
  const [updatedMembers, setUpdatedMembers] = useState<any>();

  const removeMember = useCallback((member: any) => {
    setUpdatedMembers(member.value);

    console.log(member.value);
  }, []);

  const [member, setMember] = useState(0);

  const addMember = useCallback(() => {
    setMember(member + 1);
  }, [member]);

  const setUpTeam = (form: any) => {
    console.log(form);
  };

  const submitTeam = (value: any) => {
    /*    e.preventDefault(); */
    console.log(value.value);
  };
  return (
    <Form onChange={setUpTeam} onSubmit={submitTeam}>
      <FormField name="name" label="Team name">
        <TextInput
          id="name"
          name="name"
          placeholder={props.name}
          defaultValue={props.name}
        />
      </FormField>
      <Box direction="column" align="center" style={{ marginTop: "15px" }}>
        <Text size="small">
          Actual members, click check box to UNSUBSCRIBE a member
        </Text>
        <FormField name="membersToRemove">
          <S.CheckTrash
            id="membersToRemove"
            name="membersToRemove"
            options={props.membersEmail}
            onChange={removeMember}
          />
        </FormField>
        {JSON.stringify(updatedMembers)}
      </Box>
      <Box
        direction="row"
        gap="medium"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          label="add member"
          color="accent-4"
          primary
          alignSelf="end"
          style={{ height: "50%", marginTop: "10px" }}
          onClick={addMember}
        />
      </Box>

      {member !== 0 &&
        Array.from({ length: member }, (_, i) => i).map((id) => (
          <MemberField key={id} id={id} />
        ))}
      <Box pad="large" style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" color="accent-4" label="Update" primary />
      </Box>
      <Box
        pad="large"
        style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}
      >
        <Button color="status-critical" label="Delete TEAM" primary />
      </Box>
    </Form>
  );
};
const mergeNameAndEmail = (usernameArr: string[], emailArr: string[]) => {
  return usernameArr.map((name, index) => {
    return { members: name, email: emailArr[index] };
  });
};
