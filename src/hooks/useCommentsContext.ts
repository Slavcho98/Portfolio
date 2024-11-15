import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";

function useCommentsContext() {
  const useCommentsContext = useContext(CommentsContext);
  if (!useCommentsContext) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return useCommentsContext;
}

export default useCommentsContext;
