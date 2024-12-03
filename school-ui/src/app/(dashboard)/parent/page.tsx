import { Announcements } from "@/components/Announcements";
import { BigCalender } from "@/components/BigCalender";
import React from "react";

export default function ParentPage() {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl ">Schedule (John Doe)</h1>
          <BigCalender />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}
