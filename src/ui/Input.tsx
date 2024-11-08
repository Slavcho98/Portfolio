import { ComponentPropsWithRef } from "react";

type InputProps = {
  id: string;
} & ComponentPropsWithRef<"input">;

function Input({ id, ...props }: InputProps) {
  return (
    <input
      id={id}
      name={id}
      {...props}
      className="bg-[#F4F4F4] w-full rounded-lg outline-none py-2 pl-10"
      placeholder="Search"
    />
  );
}

export default Input;
