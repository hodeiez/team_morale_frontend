import {
  CheckBox,
  Text,
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  ResponsiveContext,
} from "grommet";
import { useCallback, useContext, useState } from "react";
import { MemberField } from "./MemberField";
import * as S from "./styled";
type Props = {
  style?: any;
  members: string[];
  name: string;
  membersEmail: string[];
};

export const EditTeamForm = (props: Props) => {
  const size = useContext(ResponsiveContext);
  const [member, setMember] = useState(0);
  const addMember = useCallback(() => {
    setMember(member + 1);
  }, [member]);

  return (
    <Form onChange={() => {}} onSubmit={() => {}}>
      <FormField name="name" label="Team name">
        <TextInput
          id="name-input"
          name="teamName"
          placeholder={props.name}
          defaultValue={props.name}
        />
      </FormField>
      <Box direction="column" align="center" style={{ marginTop: "15px" }}>
        <Text size="small">Actual members, click to unsubscribe</Text>
        {mergeNameAndEmail(props.members, props.membersEmail).map((u: any) => (
          <Box
            direction="row"
            margin="5px"
            background="white"
            round
            width="75%"
            pad="10px"
          >
            <Text
              size={size === "small" ? "small" : "medium"}
              alignSelf="start"
              margin="auto"
              style={{ marginLeft: 0 }}
            >
              {u.members}
            </Text>
            <Text
              size={size === "small" ? "small" : "medium"}
              alignSelf="center"
              margin="auto"
            >
              {u.email}
            </Text>
            <Text
              size={size === "small" ? "small" : "medium"}
              margin="auto"
              alignSelf="end"
              textAlign="end"
              style={{ marginRight: 0 }}
            >
              <S.CheckTrash width={size === "small" ? 1 : "medium"} />
            </Text>
          </Box>
        ))}
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
