import useQuestions from "../hooks/useQuestions";

import Button from "./Button";

// type StartScreenProps = {
//   numQuestions: number;
//   dispatch: React.Dispatch<Action>;
// };

function StartScreen() {
  const { numQuestions, dispatch } = useQuestions();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <Button
        el="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </Button>
    </div>
  );
}

export default StartScreen;
