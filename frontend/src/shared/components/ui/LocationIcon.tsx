import { LocationType } from "api/models/Location";
import AtmSvg from "@/assets/vectors/atm.svg";
import DepartmentSvg from "@/assets/vectors/department.svg";
import { FC, HTMLProps } from "react";

interface Props extends HTMLProps<SVGElement> {
  type: LocationType;
  size?: number;
}

export const LocationIcon: FC<Props> = ({ type, size, ...props }) =>
  type === "atm" ? (
    <AtmSvg height={size ?? 18} {...props} />
  ) : (
    <DepartmentSvg height={size ?? 18} {...props} />
  );
