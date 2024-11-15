import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  el: "button" | "anchor";
} & ComponentPropsWithoutRef<"button"> &
  ComponentPropsWithoutRef<"a">;

function Button({ children, el, ...props }: ButtonProps) {
  if (el === "anchor") {
    return <a {...props}>{children}</a>;
  } else {
    return <button {...props}>{children}</button>;
  }
}

export default Button;
