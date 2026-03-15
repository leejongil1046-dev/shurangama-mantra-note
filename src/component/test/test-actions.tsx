const buttonClass =
  "rounded border px-3 py-1 text-base cursor-pointer hover:bg-gray-100";

type TestActionsProps = {
  hasHydrated: boolean;
  isActive: boolean;
  isGraded?: boolean;
  showWrongInputs?: boolean;
  hasWrongInputs?: boolean;
  onStart: () => void;
  onGrade?: () => void;
  onShowWrongInputs?: () => void;
};

export default function TestActions({
  hasHydrated,
  isActive,
  isGraded = false,
  showWrongInputs = false,
  hasWrongInputs = true,
  onStart,
  onGrade,
  onShowWrongInputs,
}: TestActionsProps) {
  if (!hasHydrated)
    return <div className="flex flex-row justify-start gap-3 w-[250px]" />;

  if (!isActive) {
    return (
      <div className="flex flex-row justify-start gap-3 w-[250px]">
        <button type="button" onClick={onStart} className={buttonClass}>
          테스트 시작
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-start gap-3 w-[250px]">
      <button
        type="button"
        onClick={onGrade}
        disabled={!onGrade}
        className={buttonClass}
      >
        {isGraded ? "결과확인" : "채점하기"}
      </button>
      {isGraded && (
        <button
          type="button"
          onClick={onShowWrongInputs}
          disabled={!hasWrongInputs}
          className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {showWrongInputs ? "정답확인" : "오답확인"}
        </button>
      )}
    </div>
  );
}
