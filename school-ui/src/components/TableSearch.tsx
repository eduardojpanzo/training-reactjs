import Image from "next/image";
import React from "react";

export function TableSearch() {
  return (
    <div className="w-full flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 md:w-auto">
      <Image src={"/search.png"} alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
}
