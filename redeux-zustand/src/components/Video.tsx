import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrent, useStore } from "../zustand-store";

export function Video() {
  const { currentLesson } = useCurrent();
  const { isLoading, next } = useStore((state) => ({
    isLoading: state.isLoading,
    next: state.next,
  }));

  const handlePlayNex = () => {
    next();
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {currentLesson && !isLoading ? (
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          controls
          playing
          onEnded={handlePlayNex}
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      )}
    </div>
  );
}
