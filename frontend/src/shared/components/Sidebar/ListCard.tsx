import { Location } from "api/models/Location";
import { FC } from "react";
import { LocationIcon } from "../ui/LocationIcon";
import { LoadIndicator } from "../ui";
import ArrowSvg from "@/assets/vectors/arrow.svg";
import ClockSvg from "@/assets/vectors/clock.svg";

interface ListCardProps {
  location?: Location;
  onClick: () => void;
}

export const ListCard: FC<ListCardProps> = (p) => {
  return (
    <li className="flex items-center cursor-pointer" onClick={p.onClick}>
      <figure className="flex items-center justify-center bg-primary rounded-base p-3 text-white">
        <LocationIcon
          type={p.location?.type ?? "department"}
          size={20}
          alt={p.location?.type}
        />
      </figure>
      <div className="flex flex-col h-full ml-3 max-w-full overflow-hidden">
        <h2 className="font-medium">{p.location?.name}</h2>
        <p className="text-text-secondary font-light text-xs overflow-ellipsis overflow-hidden whitespace-nowrap">
          {p.location?.address}
        </p>
        <div className="flex items-center gap-1 text-text-primary font-light text-xs mt-2">
          <ArrowSvg className="w-3 h-3" />
          <p>{p.location?.distanceToLocationMeters} метров</p>
          <ClockSvg className="w-3 h-3 ml-4" />
          <p>{p.location?.timeToLocationSeconds} минут</p>
        </div>
      </div>
      <LoadIndicator className="ml-auto" load={p.location?.load} size={18} />
    </li>
  );
};
