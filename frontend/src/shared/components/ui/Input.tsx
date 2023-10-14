import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary" | "secondary";
  onChange?: (text: string) => void;
  icon?: JSX.Element;
}

export const Input: FC<InputProps> = ({
  appearance = "primary",
  onChange,
  icon,
  className,
  ...props
}) => {
  return (
    <div className={twMerge("w-full relative", className)}>
      <input
        className={twMerge(
          "w-full px-4 py-3 transition-colors rounded-base outline-none",
          appearance === "primary" &&
            "bg-input-primary-bg text-input-primary-text",
          appearance === "secondary" &&
            "bg-input-secondary-bg text-input-secondary-text placeholder:text-input-secondary-placeholder",
          icon && "pr-12"
        )}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
      {icon && (
        <div className="absolute top-0 right-4 flex items-center justify-center h-full pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  );
};
