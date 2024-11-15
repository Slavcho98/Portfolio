import useQuestions from "../hooks/useQuestions";
import Container from "./Container";

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuestions();
  return (
    <Container as="header" className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </Container>
  );
}

export default Progress;
