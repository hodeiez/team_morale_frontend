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
export const sendEvaluation = () => {
  return `${API_ENDPOINT}/evaluation`;
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
