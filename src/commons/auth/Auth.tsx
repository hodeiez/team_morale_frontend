export const setCredentials = (credentials: any) => {
  localStorage.setItem("credentials", credentials);
};
export const getCredentials = () => {
  return localStorage.getItem("credentials");
};
