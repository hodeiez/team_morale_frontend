import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  ResponsiveContext,
  Text,
  TextInput,
} from "grommet";
import * as S from "./styled";
import * as GS from "../../commons/styles/styles";
import { useCallback, useContext, useEffect, useState } from "react";
import { getUser, getBearer, updateUserName } from "../../commons/auth/Auth";
import { useFetch2, useFetchPostOrUpdate } from "../../commons/hooks/useFetch";
import {
  deleteMe,
  getMyStats,
  updateMe,
  updatePassword,
} from "../../commons/api/apiConstants";
import { LineGraph } from "../../components/graph/LineGraph";
import * as N from "../../commons/components/Notifications";
import { MaxAndMin } from "../../components/dataReview/MaxAndMin";
import Loading from "../../commons/components/Loading/Loading";
import { ConfirmationModal } from "../../components/modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const size = useContext(ResponsiveContext);
  const history = useNavigate();
  const { isLoading, apiData, serverError, execute } = useFetchPostOrUpdate({});

  //to delete profile
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    return false;
  };
  const handleDelete = () => {
    setDeleteProfile(true);
  };
  useEffect(() => {
    const deleteIt = async () => {
      await execute({
        url: deleteMe(),
        headers: { Authorization: getBearer() },
        method: "DELETE",
      });
    };

    serverError && !isLoading && setDeleteProfile(false);
    deleteProfile && deleteIt();

    apiData && history("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProfile, apiData]);

  //to set stats
  const [stats, setStats] = useState<any>();
  const { state } = useFetch2(getMyStats(), {
    headers: { Authorization: getBearer() },
  });
  //to update name and password
  const [userName, setUserName] = useState<any>({});
  const [userPass, setUserPass] = useState<any>({});
  const setUpNewName = useCallback((username: any) => {
    setUserName(username);
  }, []);

  const sendUpdatedName = async (e: any) => {
    e.preventDefault();
    await execute({
      url: updateMe(),
      body: userName,
      method: "PUT",
      headers: { Authorization: getBearer() },
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
      headers: { Authorization: getBearer() },
    });
  };

  useEffect(() => {
    if (!state.loading) setStats(state.post);
  }, [state, setStats]);

  useEffect(() => {
    apiData && updateUserName(userName);
  }, [apiData, userName]);

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
      <S.BoxForRemoveMe>
        <Text alignSelf="center" size="small">
          all your data will be removed
        </Text>
        <Button
          color="status-critical"
          primary
          label="Remove my account"
          onClick={openModal}
        />
      </S.BoxForRemoveMe>
      {modalOpen && (
        <ConfirmationModal
          onClose={handleCloseModal}
          delete={handleDelete}
          message="If you choose to delete, all your data will be erased, and you will be log out. But, you will be welcome any time you want"
        />
      )}
      <Box height="1px">{isLoading && <Loading />}</Box>

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
      {serverError && !isLoading && (
        <N.MyToaster type="ERROR" message={serverError} visible={true} />
      )}

      {apiData && !isLoading && !serverError && (
        <N.MyToaster message="updated!" visible={true} />
      )}
    </Box>
  );
};
