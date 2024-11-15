import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

function Input({ label, id, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...rest} />
    </div>
  );
}

export default Input;
