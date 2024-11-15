export type State = {
  userName: string;
  lastName: string;
  newPassword: string;
  profession: string;
  showPassword: boolean;
};

type Action =
  | { type: "SET_USER_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_NEW_PASSWORD"; payload: string }
  | { type: "SET_PROFESSION"; payload: string }
  | { type: "TOGGLE_PASSWORD_VISIBILITY" };

export const initialState: State = {
  userName: "",
  lastName: "",
  newPassword: "",
  profession: "",
  showPassword: false,
};

export const settingsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_NEW_PASSWORD":
      return { ...state, newPassword: action.payload };
    case "SET_PROFESSION":
      return { ...state, profession: action.payload };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};
