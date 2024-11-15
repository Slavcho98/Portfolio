import { createContext, useReducer } from "react";
import { ChildrenProps } from "../types/types";

interface User {
  name: string;
  email: string;
  avatar: string;
}
interface ContextValues {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

type initialStateProps = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: initialStateProps = {
  user: null,
  isAuthenticated: false,
};

type Action = { type: "login"; payload: User } | { type: "logout" };

const AuthContext = createContext<ContextValues | undefined>(undefined);

function reducer(state: initialStateProps, action: Action): initialStateProps {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("An error occurred");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: ChildrenProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: {
          name: FAKE_USER.name,
          email: FAKE_USER.email,
          avatar: FAKE_USER.avatar,
        },
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
