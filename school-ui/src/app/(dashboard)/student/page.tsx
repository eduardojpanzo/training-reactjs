import { Announcements } from "@/components/Announcements";
import { BigCalendar } from "@/components/BigCalendar";
import { EventCalendar } from "@/components/EventCalendar";
import React from "react";

export default function StudentPage() {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl ">Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
