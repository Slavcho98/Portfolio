import Button from "./Button";

import useQuestions from "../hooks/useQuestions";
import { QuestionsProps } from "../types/types";

interface OptionsProps {
  question: QuestionsProps;
}

function Options({ question }: OptionsProps) {
  const { dispatch, answer } = useQuestions();

  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <Button
          key={option}
          disabled={answer !== null}
          el="button"
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export default Options;
