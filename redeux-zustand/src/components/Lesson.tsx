import { PlayCircle, Video } from "lucide-react";
interface Props {
  title: string;
  duraction: string;
  onPlay: () => void;
  isCurrent: boolean;
}
export function Lesson({ duraction, title, onPlay, isCurrent = false }: Props) {
  return (
    <button
      onClick={onPlay}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[play=true]:text-emerald-400 data-[play=false]:hover:text-zinc-100"
      data-play={isCurrent}
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-400" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}

      <span>{title}</span>
      <span className="ml-auto font-mono text-xs to-zinc-50">{duraction}</span>
    </button>
  );
}
