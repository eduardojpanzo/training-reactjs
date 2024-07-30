import { MessageCircle } from "lucide-react";
import { useCurrent } from "../store/slices/player";
import { useAppSelector } from "../store";

export function Header() {
  const { currentLesson, currentModule } = useCurrent();
  const isCouseLoading = useAppSelector((state) => state.player.isLoading);
  return (
    <div className="flex ic justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          {isCouseLoading ? (
            <span className="flex w-8 h-4 animate-pulse"></span>
          ) : (
            currentLesson?.title
          )}
        </h1>
        <span className="text-sm text-zinc-400">
          Modulo - {currentModule?.title}
        </span>
      </div>

      <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium to-white hover:bg-violet-600">
        <MessageCircle />
        Deixar feedback
      </button>
    </div>
  );
}
