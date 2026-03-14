"use client";

import type React from "react";
import { useRef } from "react";
import { getIndentPx, getLinesForRender } from "@/lib/mantra-format";
import type { Mantra, RenderLineInfo } from "@/types/mantra";
import { useBlankInputKeys } from "@/hooks/use-blank-input-keys";

export type GradeDisplayEntry = {
  correctChar: string;
  isCorrect: boolean;
};

export type MantraTextViewProps = {
  mantra: Mantra;
  blankIndices?: Set<number>;
  mode?: "practice" | "test";
  answers?: Record<number, string>;
  onChangeAnswer?: (index: number, value: string) => void;
  gradeDisplay?: Record<number, GradeDisplayEntry>;
  fontSize?: number;
  blankOrder?: number[];
};

const DEFAULT_FONT_SIZE = 20;

export function getMantraLayoutByFontSize(fontSize: number = DEFAULT_FONT_SIZE) {
  const baseFontSize = DEFAULT_FONT_SIZE;
  const ratio = fontSize / baseFontSize;

  return {
    fontSize,
    charBoxWidth: 24 * ratio,
    charBoxHeight: 26 * ratio,
    marginBottom: 12 * ratio,
  };
}

export default function MantraTextView({
  mantra,
  blankIndices = new Set<number>(),
  mode = "practice",
  answers,
  onChangeAnswer,
  gradeDisplay,
  fontSize = DEFAULT_FONT_SIZE,
  blankOrder,
}: MantraTextViewProps) {
  const { charBoxWidth, charBoxHeight, marginBottom } =
    getMantraLayoutByFontSize(fontSize);

  const lines = getLinesForRender(mantra);

  const {
    handleBlankInputKeyDown,
    onCompositionStart,
    onCompositionEnd,
  } = useBlankInputKeys(blankOrder);

  const renderLine = (lineInfo: RenderLineInfo, lineIndex: number) => {
    const { line, indent, startIndex } = lineInfo;
    const lineChars = line.split("");
    const paddingLeft = getIndentPx(indent, charBoxWidth);
    const isTest = mode === "test";

    const elements = lineChars.map((char, i) => {
      const globalIndex = startIndex + i;

      if (blankIndices.has(globalIndex)) {
        if (gradeDisplay?.[globalIndex]) {
          const graded = gradeDisplay[globalIndex];

          return (
            <div
              key={globalIndex}
              className="flex items-center justify-center text-center font-mantra font-semibold"
              style={{
                width: charBoxWidth,
                height: charBoxHeight,
                border: "1px solid #999",
                borderRadius: 5,
                boxSizing: "border-box",
                backgroundColor: "#f8f8f8",
                fontSize,
                color: graded.isCorrect ? "#2563eb" : "#dc2626",
              }}
            >
              <span
                className="relative block leading-none"
                style={{
                  fontSize,
                  top: "-1px",
                }}
              >
                {graded.correctChar}
              </span>
            </div>
          );
        }

        if (isTest && onChangeAnswer) {
          const value = answers?.[globalIndex] ?? "";

          return (
            <input
              key={globalIndex}
              data-blank-global-index={globalIndex}
              value={value}
              maxLength={1}
              onChange={(e) => onChangeAnswer(globalIndex, e.target.value)}
              onKeyDown={(e) => handleBlankInputKeyDown(e, globalIndex)}
              onCompositionStart={onCompositionStart}
              onCompositionEnd={onCompositionEnd}
              className="pb-0.5 text-center font-mantra font-semibold focus:outline-gray-500"
              style={{
                width: charBoxWidth,
                height: charBoxHeight,
                border: "1px solid #999",
                borderRadius: 5,
                boxSizing: "border-box",
                backgroundColor: "#f8f8f8",
                fontSize,
              }}
            />
          );
        }

        return (
          <div
            key={globalIndex}
            className="flex items-center justify-center text-center"
            style={{
              width: charBoxWidth,
              height: charBoxHeight,
              border: "1px solid #999",
              borderRadius: 5,
              boxSizing: "border-box",
              backgroundColor: "#f8f8f8",
            }}
          >
            <span
              className="relative block leading-none font-mantra text-[#f8f8f8] hover:cursor-none hover:text-gray-400"
              style={{ fontSize, top: "-1px" }}
            >
              {char}
            </span>
          </div>
        );
      }

      return (
        <div
          key={globalIndex}
          className="flex items-center justify-center font-mantra"
          style={{
            width: charBoxWidth,
            height: charBoxHeight,
          }}
        >
          <span
            className="relative block leading-none"
            style={{ fontSize, top: "-1px" }}
          >
            {char}
          </span>
        </div>
      );
    });

    return (
      <div
        key={lineIndex}
        className="flex"
        style={{ paddingLeft, marginBottom }}
      >
        {elements}
      </div>
    );
  };

  return (
    <div className="font-mantra leading-relaxed" data-mantra-container>
      {lines.map((lineInfo, lineIndex) => renderLine(lineInfo, lineIndex))}
    </div>
  );
}