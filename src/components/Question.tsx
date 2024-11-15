import useQuestions from "../hooks/useQuestions";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuestions();
  const question = questions[index]; 

  if (!question) return null; 

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
