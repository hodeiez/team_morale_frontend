import { User } from "./AuthContext";

type Credentials = {
  username: string;
  email: string;
  token: string;
  auth: boolean;
};

export const setCredentials = (credentials: Credentials) => {
  localStorage.setItem("credentials", JSON.stringify(credentials));
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
export const updateUserName = (username: any) => {
  const updated = {
    ...JSON.parse(getCredentials()!),
    ...username,
  };
  setCredentials(updated);
};
export const getBearer = () => {
  return "Bearer " + JSON.parse(getCredentials()!).token;
};
