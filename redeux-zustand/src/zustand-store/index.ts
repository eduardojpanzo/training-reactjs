import { create } from "zustand";
import { api } from "../lib/axios";

interface Course {
  id: number;
  name: string;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, LessonIndex] = moduleAndLessonIndex;
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: LessonIndex,
      });
    },

    next: () => {
      const { course, currentLessonIndex, currentModuleIndex } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
        return;
      }

      const nextModuleIndex = currentModuleIndex + 1;

      const nextModule = course?.modules[nextModuleIndex];

      if (nextModule) {
        set({
          currentModuleIndex: nextModuleIndex,
          currentLessonIndex: 0,
        });
      }
    },

    load: async () => {
      set({
        isLoading: true,
      });
      const response = await api.get("/courses/1");

      set({
        course: response.data,
        isLoading: false,
      });
    },
  };
});
