const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const login = (params?: any) => {
  return `${API_ENDPOINT}/user/login`;
};
export const signUp = (params?: any) => {
  return `${API_ENDPOINT}/user/`;
};
export const myTeams = () => {
  return `${API_ENDPOINT}/team/myTeams/`;
};
export const oneTeam = (id: number) => {
  return `${API_ENDPOINT}/team/id/${id}`;
};
export const sendEvaluation = () => {
  return `${API_ENDPOINT}/evaluation`;
};
export const createOrUpdate = () => {
  return `${API_ENDPOINT}/evaluation/createOrUpdate/`;
};
export const getMyTeamsToday = (userTeamsId: number) => {
  return `${sendEvaluation()}/myTeamToday/${userTeamsId}`;
};
export const getEvent = (params?: any) => {
  return `${API_ENDPOINT}/evaluation/events?userTeamId=${params.userTeamId}`;
};
export const createTeamWithEmails = () => {
  return `${API_ENDPOINT}/team/createTeamWithEmails/`;
};
export const getTeamAverageHistory = (teamId: number) => {
  return `${sendEvaluation()}/stats/team/${teamId}`;
};
export const getMyStats = () => {
  return `${API_ENDPOINT}/user/getMyStats`;
};
export const updateMe = () => {
  return `${API_ENDPOINT}/user/updateMe`;
};
export const updatePassword = () => {
  return `${API_ENDPOINT}/user/changePass`;
};
export const updateTeam = () => {
  return `${API_ENDPOINT}/team/update`;
};
export const deleteTeam = (userTeamId: number) => {
  return `${API_ENDPOINT}/team/delete/full/userTeam/${userTeamId}`;
};
export const unsubscribeMe = (teamId: number) => {
  return `${API_ENDPOINT}/team/unsubscribeMe/from/${teamId}`;
};
export const resetPass = () => {
  return `${API_ENDPOINT}/user/resetPass`;
};
export const sendForgotPass = (email: string) => {
  return `${API_ENDPOINT}/user/forgotPass/email/${email}`;
};
