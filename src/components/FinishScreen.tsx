import useQuestions from "../hooks/useQuestions";
import Button from "./Button";

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuestions();

  const percentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints}(
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>
      <Button
        el="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </Button>
    </>
  );
}

export default FinishScreen;
