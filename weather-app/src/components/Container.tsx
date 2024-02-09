import { cn } from "@/utils/cn";
import { HTMLProps } from "react";

type Props = {};

export function Container(props: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
