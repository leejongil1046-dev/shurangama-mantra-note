"use client";

import ModalActionButton from "@/component/ui/modal-action-button";

export type ConfirmMode =
  | "reset-practice"
  | "reset-memorize"
  | "grade-with-blanks";

type ConfirmModalProps = {
  open: boolean;
  mode: ConfirmMode;
  onConfirm: () => void;
  onClose: () => void;
  params?: Record<string, string | number>;
};

const PRESET = {
  "reset-practice": {
    title: "연습하기 상태를 초기화할까요?",
    description:
      "현재 페이지 범위와 난이도는 유지한 채, 생성된 빈칸을 모두 지우고 빈칸 모드를 해제한 뒤 첫 페이지로 이동합니다.",
    confirmLabel: "초기화",
    cancelLabel: "취소",
  },
  "reset-memorize": {
    title: "암기하기 상태를 초기화할까요?",
    description:
      "현재 페이지 범위와 난이도는 유지한 채, 암기하기의 빈칸과 입력한 답을 모두 지우고 첫 페이지로 이동합니다.",
    confirmLabel: "초기화",
    cancelLabel: "취소",
  },
  "grade-with-blanks": {
    title: "채점하시겠습니까?",
    description:
      "총 {totalBlanks}개의 빈칸 중 {filledCount}개를 입력하셨습니다. 정말 채점하시겠습니까?",
    confirmLabel: "채점하기",
    cancelLabel: "취소",
  },
} as const;

function applyParams(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (acc, [key, value]) =>
      acc.replace(new RegExp(`\\{${key}\\}`, "g"), String(value)),
    template,
  );
}

export default function ConfirmModal({
  open,
  mode,
  onConfirm,
  onClose,
  params,
}: ConfirmModalProps) {
  if (!open) return null;

  const preset = PRESET[mode];
  const description = applyParams(preset.description, params);
  const { title, confirmLabel, cancelLabel } = preset;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-md bg-white p-4 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 p-2">{title}</h2>
        <div className="text-sm leading-relaxed text-gray-600 p-2">
          {description}
        </div>

        <div className="flex justify-end gap-3 p-2">
          <ModalActionButton
            label={cancelLabel}
            variant="cancel"
            onClick={onClose}
            fontSize={12}
          />
          <ModalActionButton
            label={confirmLabel}
            variant="primary"
            onClick={handleConfirm}            
            fontSize={12}
          />
        </div>
      </div>
    </div>
  );
}