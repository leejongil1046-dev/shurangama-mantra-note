"use client";

import PageRangeSetting from "@/component/page-range-setting";
import DifficultySetting from "@/component/difficulty-setting";
import { useSettingStore } from "@/store/setting-store";
import { useMemo, useState } from "react";

export default function SettingPage() {
  const { pageStart, pageEnd, difficulty, setPageRange, setDifficulty } =
    useSettingStore();

  const [tempRange, setTempRange] = useState<[number, number]>([
    pageStart,
    pageEnd,
  ]);
  const [tempDifficulty, setTempDifficulty] = useState(difficulty);

  const isChanged = useMemo(() => {
    const [tempStart, tempEnd] = tempRange;
    return (
      tempStart !== pageStart ||
      tempEnd !== pageEnd ||
      tempDifficulty !== difficulty
    );
  }, [tempRange, tempDifficulty, pageStart, pageEnd, difficulty]);

  return (
    <div className="mx-auto flex w-[1000px] flex-1 flex-col justify-between px-6 py-10">
      <div className="space-y-15 pt-5">
        <PageRangeSetting
          totalPages={12}
          value={tempRange}
          onChange={setTempRange}
        />

        <DifficultySetting
          value={tempDifficulty}
          onChange={setTempDifficulty}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          disabled={!isChanged}
          onClick={() => {
            const [start, end] = tempRange;
            setPageRange(start, end);
            setDifficulty(tempDifficulty);
          }}
          className={`rounded-md px-6 py-3 text-lg text-white transition-colors ${
            isChanged
              ? "cursor-pointer bg-gray-900 hover:bg-gray-800"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          저장
        </button>
      </div>
    </div>
  );
}

