import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  el: "button" | "anchor";
  children: ReactNode;
} & ComponentPropsWithoutRef<"button"> &
  ComponentPropsWithoutRef<"a">;

function Button({ el, children, ...rest }: ButtonProps) {
  if (el === "anchor") {
    return <a {...rest}>{children}</a>;
  }

  return <button {...rest}>{children}</button>;
}

export default Button;
