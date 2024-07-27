import { Video } from "lucide-react";
interface Props {
  title: string;
  duraction: string;
  onPlay: () => void;
}
export function Lesson({ duraction, title, onPlay }: Props) {
  return (
    <button
      onClick={onPlay}
      className="flex items-center gap-3 text-sm text-zinc-400"
    >
      <Video className="w-4 h-4 text-zinc-500" />

      <span>{title}</span>
      <span className="ml-auto font-mono text-xs to-zinc-50">{duraction}</span>
    </button>
  );
}
