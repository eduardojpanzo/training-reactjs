import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useCurrent, useStore } from "../zustand-store";

interface Props {
  title: string;
  moduleIndex: number;
  amountOfLessons: number;
}
export function Module({ amountOfLessons, moduleIndex, title }: Props) {
  const { module, play } = useStore((state) => ({
    module: state.course?.modules[moduleIndex],
    play: state.play,
  }));
  const { currentLessonIndex, currentModuleIndex } = useCurrent();
  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger className="flex w-full ic gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-4">
          {module &&
            module.lessons.map((lesson, lessonIndex) => (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duraction={lesson.duration}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={
                  currentModuleIndex === moduleIndex &&
                  currentLessonIndex === lessonIndex
                }
              />
            ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
