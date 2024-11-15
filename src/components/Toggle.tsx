import Button from "./Button";

type ToggleButtonProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

function Toggle({ setIsOpen, isOpen }: ToggleButtonProps) {
  return (
    <>
      <Button
        el="button"
        className="btn-toggle"
        onClick={() => setIsOpen((open: boolean) => !open)}
      >
        {isOpen ? "–" : "+"}
      </Button>
    </>
  );
}

export default Toggle;
