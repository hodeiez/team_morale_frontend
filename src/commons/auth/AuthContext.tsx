import * as Auth from "./Auth";

import React, { createContext, useReducer } from "react";

export type User = {
  email: string;
  username: string;
};
export type InitialStateType = {
  user: User;
  auth: boolean;
};
const initialState: InitialStateType = {
  auth: false,
  user: {} as User,
};
//const AuthContext = createContext<InitialStateType>(initialState);

export type Action =
  | { type: "LOGIN"; user: User; token: string; auth: boolean }
  | { type: "LOGOUT"; auth: boolean };

export const authReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      Auth.setCredentials({
        ...action.user,
        token: action.token,
        auth: action.auth,
      });
      return {
        ...state,
        ...{
          user: action.user,
          token: action.token,
          auth: action.auth,
        },
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        user: {} as User,
        auth: action.auth,
      };
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
