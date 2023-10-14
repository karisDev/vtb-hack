import React from "react";
import { Hint } from "../map-context";
import { Location } from "api/models/Location";
import { LoadIndicator } from "@/components/ui";
import ArrowSvg from "@/assets/vectors/arrow.svg";
import ClockSvg from "@/assets/vectors/clock.svg";

export function HintBase() {
  // @ts-ignore
  const ctx = React.useContext(Hint.YMapHintContext);

  // @ts-ignore
  const hint = ctx?.hint as Location;
  return (
    <div className="">
      {hint && (
        <>
          <div className="flex flex-col ml-6 -mt-2 p-3 bg-white rounded-base">
            <h2 className="font-medium">{hint.name}</h2>
            <p className="text-text-secondary font-light text-xs overflow-ellipsis overflow-hidden whitespace-nowrap">
              {hint.address}
            </p>
            <div className="flex items-center gap-1 text-text-primary font-light text-xs mt-2">
              <ArrowSvg className="w-3 h-3" />
              <p>{hint.distanceToLocationMeters} метров</p>
              <ClockSvg className="w-3 h-3 ml-4" />
              <p className="mr-4">{hint.timeToLocationSeconds} минут</p>
              <LoadIndicator className="ml-auto" load={hint.load} size={12} />
              <p>
                {hint.load &&
                  {
                    low: "Свободно",
                    medium: "Средняя загруженность",
                    high: "Высокая загруженность",
                  }[hint.load]}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
