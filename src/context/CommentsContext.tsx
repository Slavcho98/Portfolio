import { createContext, useReducer } from "react";
import { ChildrenProps } from "../types/type";

interface CommentsContextProps {
  editingCommentId: string | null;
  commentToDelete: string | null;
  menuAnchorEl: HTMLElement | null;
  selectedCommentId: string | null;
  isCommentModalOpen: boolean;
  dispatch: (action: Action) => void;
}

type InitialStateProps = {
  editingCommentId: string | null;
  commentToDelete: string | null;
  menuAnchorEl: HTMLElement | null;
  selectedCommentId: string | null;
  isCommentModalOpen: boolean;
};

const initialState: InitialStateProps = {
  editingCommentId: null,
  commentToDelete: null,
  menuAnchorEl: null,
  selectedCommentId: null,
  isCommentModalOpen: false,
};

const CommentsContext = createContext<CommentsContextProps | null>(null);

type Action =
  | { type: "SET_EDITING_COMMENT_ID"; payload: string | null }
  | { type: "SET_COMMENT_TO_DELETE"; payload: string | null }
  | { type: "SET_MENU_ANCHOR_EL"; payload: HTMLElement | null }
  | { type: "SET_SELECTED_COMMENT_ID"; payload: string | null }
  | { type: "TOGGLE_COMMENT_MODAL"; payload: boolean };

function reducer(state: InitialStateProps, action: Action): InitialStateProps {
  switch (action.type) {
    case "SET_EDITING_COMMENT_ID":
      return {
        ...state,
        editingCommentId:
          state.editingCommentId === action.payload ? null : action.payload,
      };
    case "SET_COMMENT_TO_DELETE":
      return { ...state, commentToDelete: action.payload };
    case "SET_MENU_ANCHOR_EL":
      return { ...state, menuAnchorEl: action.payload };
    case "SET_SELECTED_COMMENT_ID":
      return { ...state, selectedCommentId: action.payload };
    case "TOGGLE_COMMENT_MODAL":
      return { ...state, isCommentModalOpen: action.payload };
    default:
      return state;
  }
}

function CommentsProvider({ children }: ChildrenProps) {
  const [
    {
      editingCommentId,
      commentToDelete,
      menuAnchorEl,
      selectedCommentId,
      isCommentModalOpen,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <CommentsContext.Provider
      value={{
        editingCommentId,
        commentToDelete,
        menuAnchorEl,
        selectedCommentId,
        isCommentModalOpen,
        dispatch,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export { CommentsProvider, CommentsContext };
