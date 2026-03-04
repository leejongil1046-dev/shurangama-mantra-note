import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Difficulty = "easy" | "medium" | "hard";

export type PageRangeSetting = {
  pageStart: number;
  pageEnd: number;
  difficulty: Difficulty;
};

type SettingState = {
  practice: PageRangeSetting;
  memorize: PageRangeSetting;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  setPracticePageRange: (start: number, end: number) => void;
  setPracticeDifficulty: (difficulty: Difficulty) => void;
  setMemorizePageRange: (start: number, end: number) => void;
  setMemorizeDifficulty: (difficulty: Difficulty) => void;
};

const TOTAL_PAGES = 12;

const defaultRange: PageRangeSetting = {
  pageStart: 1,
  pageEnd: TOTAL_PAGES,
  difficulty: "easy",
};

function clampPageRange(
  start: number,
  end: number,
): { start: number; end: number } {
  const normalizedStart = Math.max(1, Math.min(start, TOTAL_PAGES));
  const normalizedEnd = Math.max(normalizedStart, Math.min(end, TOTAL_PAGES));
  return { start: normalizedStart, end: normalizedEnd };
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      practice: { ...defaultRange },
      memorize: { ...defaultRange },
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      setPracticePageRange: (start, end) => {
        const { start: s, end: e } = clampPageRange(start, end);
        set((state) => ({
          practice: { ...state.practice, pageStart: s, pageEnd: e },
        }));
      },
      setPracticeDifficulty: (difficulty) =>
        set((state) => ({
          practice: { ...state.practice, difficulty },
        })),

      setMemorizePageRange: (start, end) => {
        const { start: s, end: e } = clampPageRange(start, end);
        set((state) => ({
          memorize: { ...state.memorize, pageStart: s, pageEnd: e },
        }));
      },
      setMemorizeDifficulty: (difficulty) =>
        set((state) => ({
          memorize: { ...state.memorize, difficulty },
        })),
    }),
    {
      name: "setting-store",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);
