import { User } from "./AuthContext";

export const setCredentials = (credentials: any) => {
  localStorage.setItem("credentials", credentials);
};
export const getCredentials = () => {
  return localStorage.getItem("credentials");
};
export const isAuth = () => {
  const credentials = getCredentials();
  return credentials ? JSON.parse(credentials!).auth : false;
};
export const getUser = () => {
  const credentials = getCredentials();
  return credentials
    ? ({
        username: JSON.parse(credentials!).username,
        email: JSON.parse(credentials!).email,
      } as User)
    : { username: "", email: "" };
};
