import useQuestions from "../hooks/useQuestions";

import Button from "./Button";

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuestions();
  if (answer === null) return null;

  // Render the "Next" button if there are more questions left
  if (index < numQuestions - 1) {
    return (
      <Button
        el="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </Button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <Button
        el="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </Button>
    );
  }

  return null;
}

export default NextButton;
