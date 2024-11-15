import { ComponentPropsWithoutRef, forwardRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} ref={ref} {...props} />
      </div>
    );
  }
);

export default Input;
