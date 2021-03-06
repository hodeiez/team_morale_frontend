import {
  Text,
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  ResponsiveContext,
} from "grommet";
import * as N from "../../commons/components/Notifications";
import { useCallback, useContext, useEffect, useState } from "react";
import * as Address from "../../commons/api/apiConstants";
import { getBearer, getUser } from "../../commons/auth/Auth";
import { useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import { MemberField } from "./MemberField";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import Loading from "../../commons/components/Loading/Loading";

type PostTeamUpdate = {
  membersToRemove: string[];
  name: string;
  membersToAdd: string[];
  userTeamId: number;
};

type Props = {
  style?: any;
  members: string[];
  name: string;
  membersEmail: string[];
  userTeamId: number;
  teamId: number;
};

export const EditTeamForm = (props: Props) => {
  const history = useNavigate();
  const size = useContext(ResponsiveContext);
  const [teamInfo, setTeamInfo] = useState<any>({
    name: props.name,
    membersEmail: props.membersEmail,
    members: props.members,
  });

  const [member, setMember] = useState(0);

  const addMember = useCallback(() => {
    setMember(member + 1);
  }, [member]);

  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({});
  const {
    isLoading: unsubMeIsLoading,
    apiData: unsubMeApiData,
    serverError: unsubMeServerError,
    execute: unsubMeExec,
  } = useFetchPostOrUpdate({});
  const {
    isLoading: deleteTeamIsLoading,
    apiData: deleteTeamApiData,
    serverError: deleteTeamServerError,
    execute: deleteTeamExec,
  } = useFetchPostOrUpdate({});

  const deleteTeam = async () => {
    await deleteTeamExec({
      url: Address.deleteTeam(props.userTeamId),
      headers: { Authorization: getBearer() },
      method: "DELETE",
    });
  };
  const unsubscribeMe = async () => {
    await unsubMeExec({
      url: Address.unsubscribeMe(props.teamId),
      headers: { Authorization: getBearer() },
      method: "DELETE",
    });
  };
  const submitTeam = async (value: any) => {
    const teamToUpdate: PostTeamUpdate = {
      userTeamId: props.userTeamId,
      name: value.value.name,
      membersToRemove: value.value.membersToRemove,
      membersToAdd: addEmailsToArray(value.value),
    };

    await execute({
      url: Address.updateTeam(),
      body: teamToUpdate,
      method: "PUT",
      headers: { Authorization: getBearer() },
    });
    value.value.membersToRemove = null;
  };

  useEffect(() => {
    apiData
      ? setTeamInfo(apiData)
      : setTeamInfo({
          name: props.name,
          membersEmail: props.membersEmail,
          members: props.members,
        });

    setMember(0);
  }, [apiData, setTeamInfo, props]);

  return (
    <Form onSubmit={submitTeam}>
      <FormField name="name" label="Team name">
        <TextInput
          id="name"
          name="name"
          placeholder={teamInfo.name}
          defaultValue={teamInfo.name}
        />
      </FormField>
      <Box direction="column" align="center" style={{ marginTop: "15px" }}>
        <Text size="small">
          Actual members, click check box to UNSUBSCRIBE a member
        </Text>
        <Box direction="row">
          <FormField name="membersToRemove">
            {teamInfo.membersEmail && (
              <S.CheckTrash
                id="membersToRemove"
                name="membersToRemove"
                options={dontIncludeMyEmail(
                  getUser().email,
                  teamInfo.membersEmail
                )}
              />
            )}
          </FormField>
          {size !== "small" && (
            <Box>
              {dontIncludeMyName(getUser().username, teamInfo.members).map(
                (name, i) => (
                  <Text
                    key={i}
                    style={{
                      marginTop: "2px",
                      marginLeft: "15px",
                      marginBottom: "8px",
                    }}
                  >
                    {name}
                  </Text>
                )
              )}
            </Box>
          )}
        </Box>
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
      <Box margin="auto" alignSelf="center" width="medium" direction="row">
        <Button
          color="status-critical"
          label="Delete TEAM"
          primary
          margin="small"
          onClick={deleteTeam}
        />
        <Button
          margin="small"
          color="status-critical"
          label="Unsubscribe me"
          primary
          onClick={unsubscribeMe}
        />
      </Box>

      <Box height="1px">
        {isLoading && <Loading />}
        {unsubMeIsLoading && <Loading />}
        {deleteTeamIsLoading && <Loading />}
      </Box>

      {apiData && !isLoading && !serverError && (
        <N.MyToaster message="updated!" visible={true} />
      )}

      {(unsubMeApiData || deleteTeamApiData) && history("/teams")}
      {serverError && !isLoading && (
        <N.MyToaster type="ERROR" message={serverError} visible={true} />
      )}
      {unsubMeServerError && !unsubMeIsLoading && (
        <N.MyToaster type="ERROR" message={unsubMeServerError} visible={true} />
      )}
      {deleteTeamServerError && !deleteTeamIsLoading && (
        <N.MyToaster
          type="ERROR"
          message={deleteTeamServerError}
          visible={true}
        />
      )}
    </Form>
  );
};

const addEmailsToArray = (values: any[]) => {
  return Object.entries(values)
    .filter(([k, v]) => k.startsWith("email"))
    .flatMap((m) => m[1]);
};
const dontIncludeMyEmail = (myEmail: string, membersEmail: string[]) => {
  return membersEmail.filter((email) => !email.startsWith(myEmail));
};
const dontIncludeMyName = (myName: string, members: string[]) => {
  return members.filter((name) => !name.startsWith(myName));
};
