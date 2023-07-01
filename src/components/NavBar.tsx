import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { MdHome, MdSearch, MdPerson } from "react-icons/md";

type NavBarProps = {
  selected: "Home" | "Search" | "Profile";
};

export const NavBar = ({ selected }: NavBarProps) => {
  const navigate = useNavigate();

  const selectedClassName = "bg-white rounded-full p-2";

  return (
    <div className="flex flex-row w-full justify-between items-center">
      <button
        className="flex justify-center w-full"
        onClick={() => navigate("/")}
      >
        <div className={selected === "Home" ? selectedClassName : ""}>
          <MdHome size={48} color={selected === "Home" ? "#0C134F" : "white"} />
        </div>
      </button>
      <button
        className="flex justify-center w-full"
        onClick={() => navigate("/search")}
      >
        <div className={selected === "Search" ? selectedClassName : ""}>
          <MdSearch
            size={48}
            color={selected === "Search" ? "#0C134F" : "white"}
          />
        </div>
      </button>
      <button
        className="flex justify-center w-full"
        onClick={() => navigate("/profile")}
      >
        <div className={selected === "Profile" ? selectedClassName : ""}>
          <MdPerson
            size={48}
            color={selected === "Profile" ? "#0C134F" : "white"}
          />
        </div>
      </button>
    </div>
  );
};
