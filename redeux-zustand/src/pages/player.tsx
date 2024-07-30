import { useEffect } from "react";
import { Header } from "../components/Header";
import { Module } from "../components/Module";
import { Video } from "../components/Video";
import { useAppDispatch, useAppSelector } from "../store";
import { loadCourse, useCurrent } from "../store/slices/player";

export function Player() {
  const modules = useAppSelector((state) => state.player.course?.modules);
  const { currentLesson } = useCurrent();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCourse());
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`;
    }
  }, [currentLesson]);
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />

        <main className="relative flex pr-80 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="absolute top-0 bottom-0 right-0 divide-y divide-zinc-900 overflow-y-scroll w-80 border-l border-zinc-800 bg-zinc-900">
            {modules &&
              modules.map((module, i) => (
                <Module
                  key={module.id}
                  moduleIndex={i}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
