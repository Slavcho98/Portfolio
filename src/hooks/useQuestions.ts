import { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

function useQuestions() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuizProvider");
  }
  return context;
}

export default useQuestions;
