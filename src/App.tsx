import Header from "./Header";
import Primary from "./Primary";
import Container from "./components/Container";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Errors from "./components/Errors";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import useQuestions from "./hooks/useQuestions";

function App() {
  const { status } = useQuestions();

  return (
    <Container as="div" className="app">
      <Header />
      <Primary>
        {status === "loading" && <Loader />}
        {status === "error" && <Errors />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question/>
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Primary>
    </Container>
  );
}

export default App;
