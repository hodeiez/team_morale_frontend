const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const login = (params?: any) => {
  return `${REACT_APP_API_ENDPOINT}/user/login`;
};
export const signUp = (params?: any) => {
  return `${REACT_APP_API_ENDPOINT}/user/signup`;
};
export const myTeams = () => {
  return `${REACT_APP_API_ENDPOINT}/team/myTeams/`;
};
export const oneTeam = (id: number) => {
  return `${REACT_APP_API_ENDPOINT}/team/id/${id}`;
};
export const sendEvaluation = () => {
  return `${REACT_APP_API_ENDPOINT}/evaluation`;
};
export const createOrUpdate = () => {
  return `${REACT_APP_API_ENDPOINT}/evaluation/createOrUpdate/`;
};
export const getMyTeamsToday = (userTeamsId: number) => {
  return `${sendEvaluation()}/myTeamToday/${userTeamsId}`;
};
export const getEvent = (params?: any) => {
  return `${REACT_APP_API_ENDPOINT}/evaluation/events?userTeamId=${params.userTeamId}&auth=${params.auth}`;
};
export const createTeamWithEmails = () => {
  return `${REACT_APP_API_ENDPOINT}/team/createTeamWithEmails/`;
};
export const getTeamAverageHistory = (teamId: number) => {
  return `${sendEvaluation()}/stats/team/${teamId}`;
};
export const getMyStats = () => {
  return `${REACT_APP_API_ENDPOINT}/user/getMyStats`;
};
export const updateMe = () => {
  return `${REACT_APP_API_ENDPOINT}/user/updateMe`;
};
export const updatePassword = () => {
  return `${REACT_APP_API_ENDPOINT}/user/changePass`;
};
export const updateTeam = () => {
  return `${REACT_APP_API_ENDPOINT}/team/update`;
};
export const deleteTeam = (userTeamId: number) => {
  return `${REACT_APP_API_ENDPOINT}/team/delete/full/userTeam/${userTeamId}`;
};
export const unsubscribeMe = (teamId: number) => {
  return `${REACT_APP_API_ENDPOINT}/team/unsubscribeMe/from/${teamId}`;
};
export const resetPass = () => {
  return `${REACT_APP_API_ENDPOINT}/user/resetPass`;
};
export const sendForgotPass = (email: string) => {
  return `${REACT_APP_API_ENDPOINT}/user/forgotPass/email/${email}`;
};
export const confirmAccount = () => {
  return `${REACT_APP_API_ENDPOINT}/user/verifyMe`;
};
export const deleteMe = () => {
  return `${REACT_APP_API_ENDPOINT}/user/deleteMe`;
};
