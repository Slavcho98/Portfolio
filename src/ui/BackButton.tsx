import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FormEvent } from "react";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      el="button"
      onClick={(e: FormEvent) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
