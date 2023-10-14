import { Key, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props<T> {
  options: T[];
  onChange: (value: T) => void;
  selectedOption: T;
  render: (value: T) => ReactNode;
  renderKey: (value: T) => Key;
}

export const Switch = <T extends unknown>(p: Props<T>) => {
  return (
    <ul className="w-full rounded-base bg-bg-secondary flex">
      {p.options.map((option) => (
        <li
          key={p.renderKey(option)}
          className={twMerge(
            "flex-1 text-center transition-colors duration-200 py-2 cursor-pointer text-text-secondary gap-2 rounded-base flex items-center justify-center text-sm",
            option === p.selectedOption && "bg-primary text-white"
          )}
          onClick={() => p.onChange(option)}
        >
          {p.render(option)}
        </li>
      ))}
    </ul>
  );
};
