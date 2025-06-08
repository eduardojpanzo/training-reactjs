import React from "react";
// import { CustomMDX } from "@/components/mdx";

type ChatProps = {
  quetion: string;
  answer: string;
};
export function Chat({ data }: { data: ChatProps[] }) {
  return (
    <div className="min-h-32  pt-2 overflow-y-auto">
      {data.map((item) => (
        <div key={item.answer} className="flex flex-col gap-4 pb-3">
          <p className="max-w-[400px] self-end p-2 rounded-md bg-white/[0.05] text-white">
            {item.quetion}
          </p>
          <div className="max-w-[520px]">
            {item.answer}
            {/* <CustomMDX source={item.answer} /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
