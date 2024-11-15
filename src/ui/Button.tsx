import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  el: "button" | "link";
  children: ReactNode;
} & (
  | ComponentPropsWithoutRef<typeof Link>
  | ComponentPropsWithoutRef<"button">
);

function Button({ el, children, ...rest }: ButtonProps) {
  if (el === "link") {
    return (
      <Link {...(rest as ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    );
  }
  return (
    <button className="button" {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}

export default Button;
