import ReactPlayer from "react-player";
import { next, useCurrent } from "../store/slices/player";
import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";

export function Video() {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrent();
  const isCouseLoading = useAppSelector((state) => state.player.isLoading);

  const handlePlayNex = () => {
    dispatch(next());
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {currentLesson && !isCouseLoading ? (
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
