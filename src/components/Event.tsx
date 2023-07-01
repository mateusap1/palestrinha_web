import React from "react";

import { MdOutlineCalendarToday } from "react-icons/md";

type EventProps = {
  publicId: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
};

export const Event = ({
  startDate,
  endDate,
  name,
  description,
}: EventProps) => {
  return (
    <div className="p-8 text-opposite">
      <div className="flex flex-row justify-between">
        <div className="text-[#BDBDBD] text-sm flex flex-row gap-3 items-center">
          <div className="flex flex-row items-center gap-1">
            <MdOutlineCalendarToday />
            <span>{startDate}</span>
          </div>
          <span>-</span>
          <div className="flex flex-row items-center gap-1">
            <MdOutlineCalendarToday />
            <span>{endDate}</span>
          </div>
        </div>
        <button className="border border-white px-4 py-0.5 rounded-lg font-bold">
          + Detalhes
        </button>
      </div>
      <div className="mt-4">
        <h1 className="font-extrabold text-xl">{name}</h1>
        <p className="mt-2 text-sm text-[#DFDFDF]">{description}</p>
      </div>
    </div>
  );
};
