import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glow?: boolean;
}

export const Button: FC<ButtonProps> = ({ glow, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "rounded-base bg-primary text-white h-12 flex items-center justify-center",
        glow && "shadow-primary",
        className
      )}
      {...props}
    />
  );
};
