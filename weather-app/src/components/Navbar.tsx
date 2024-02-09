import React from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <h2 className=" flex items-center justify-center gap-2">
          <p className="text-gray-500 text-3xl">Weather</p>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </h2>

        <section className="flex items-center gap-2">
          <MdMyLocation className="text-2xl text-gray-400 hover: opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm"></p>

          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
