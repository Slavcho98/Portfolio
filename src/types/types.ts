import { ReactNode } from "react";

export interface QuestionsProps {
  question: string;
  options: string[];
  correctOption: 1;
  points: number;
  id: string;
  
}
export type InitialStateProps = {
  questions: QuestionsProps[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

export type Action =
  | { type: "dataRecieved"; payload: QuestionsProps[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "reset" }
  | { type: "tick" };

export type SingleQuestionProps = {
  question: QuestionsProps;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};

export type ChildrenProps = {
  children: ReactNode;
}