import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

function Container<U extends ElementType>({
  as,
  children,
  ...rest
}: ContainerProps<U>) {
  const Component = as || "div";
  return <Component {...rest}>{children}</Component>;
}

export default Container;
