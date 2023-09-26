import React from "react";

import { MdOutlineCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type EventProps = {
  publicId: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
  subAreas: string[];
};

export const Event = ({
  publicId,
  startDate,
  endDate,
  name,
  description,
  subAreas,
}: EventProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-4 text-opposite border-b border-b-[#BDBDBD] max-md:flex max-md:flex-col-reverse">
      <div className="flex flex-row justify-between gap-4">
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
        <button
          onClick={() => navigate(`/event/${publicId}`)}
          className="border border-white px-4 py-0.5 rounded-lg font-bold hover-opacity-80"
        >
          Info
        </button>
      </div>
      <div className="mt-4">
        <h1 className="font-extrabold text-xl">{name}</h1>
        <p className="mt-2 text-sm text-[#DFDFDF] mb-8">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {subAreas.map((subArea) => (
          <span className="text-sm text-slate-200">#{subArea}</span>
        ))}
      </div>
    </div>
  );
};
