import * as Auth from "./Auth";

import React, { createContext, useReducer } from "react";

type User = {
  email: string;
  username: string;
};
export type InitialStateType = {
  user: User;
  auth: boolean;
};
const initialState = {
  auth: false,
  user: { email: "", username: "" },
};
//const AuthContext = createContext<InitialStateType>(initialState);

export type Action =
  | { type: "LOGIN"; user: User; token: string; auth: boolean }
  | { type: "LOGOUT"; auth: boolean };

export const authReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      Auth.setCredentials(
        JSON.stringify({
          ...action.user,
          token: action.token,
          auth: action.auth,
        })
      );
      return {
        ...state,
        ...{
          email: action.user.email,
          username: action.user.username,
          token: action.token,
          auth: action.auth,
        },
      };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, ...{ email: "", username: "" }, auth: action.auth };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});
export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
