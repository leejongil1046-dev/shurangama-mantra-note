const buttonClass =
  "rounded border w-[80px] py-1 text-sm cursor-pointer hover:bg-gray-100";

type TestActionsProps = {
  hasHydrated: boolean;
  isActive: boolean;
  isGraded?: boolean;
  onStart: () => void;
  onGrade?: () => void;
};

export default function TestActions({
  hasHydrated,
  isActive,
  isGraded = false,
  onStart,
  onGrade,
}: TestActionsProps) {
  if (!hasHydrated)
    return <div className="flex flex-row justify-start gap-3 w-[200px]" />;

  if (!isActive) {
    return (
      <div className="flex flex-row justify-start gap-3 w-[200px]">
        <button type="button" onClick={onStart} className={buttonClass}>
          테스트 시작
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-start gap-3 w-[200px]">
      <button
        type="button"
        onClick={onGrade}
        disabled={!onGrade}
        className={buttonClass + (onGrade ? "" : " opacity-60 cursor-default")}
      >
        {isGraded ? "결과확인" : "채점하기"}
      </button>
    </div>
  );
}
