import { cn } from "@wahab/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-300 px-6 sm:px-10", className)}
    >
      {children}
    </Component>
  );
}
