import { MessageCircle } from "lucide-react";

export function Header() {
  return (
    <div className="flex ic justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Fundamentos do REdux</h1>
        <span className="text-sm text-zinc-400">Modulo - </span>
      </div>

      <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium to-white hover:bg-violet-600">
        <MessageCircle />
        Deixar feedback
      </button>
    </div>
  );
}
