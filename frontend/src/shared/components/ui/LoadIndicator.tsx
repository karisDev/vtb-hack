import LoadSvg from "@/assets/vectors/load.svg";
import { LocationLoad } from "api/models/Location";
import { twMerge } from "tailwind-merge";

export const LoadIndicator = ({
  load,
  className,
  size = 18,
  disabled,
}: {
  className?: string;
  load?: LocationLoad;
  size?: number;
  disabled?: boolean;
}) => {
  return (
    <LoadSvg
      height={size}
      width={size}
      style={{ minWidth: size }}
      className={twMerge(
        "text-text-secondary",
        load === "low" && "text-status-ok",
        load === "medium" && "text-status-warning",
        load === "high" && "text-status-error",
        disabled && "text-white",
        className
      )}
    />
  );
};
