import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  el: "button" | "anchor";
  children: ReactNode;
} & ComponentPropsWithoutRef<"button"> &
  ComponentPropsWithoutRef<"a">;

function Button({ el, children, ...props }: ButtonProps) {
  if (el === "anchor") return <a {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
}

export default Button;
