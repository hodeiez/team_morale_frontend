const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const login = (params?: any) => {
  return `${API_ENDPOINT}/user/login`;
};

export const myTeams = () => {
  return `${API_ENDPOINT}/team/my_teams/`;
};
