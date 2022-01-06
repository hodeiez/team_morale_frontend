const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const login = (params?: any) => {
  return `${API_ENDPOINT}/user/login`;
};
