type ModalActionButtonVariant = "cancel" | "primary" | "primaryDisabled";

type ModalActionButtonProps = {
  label: string;
  onClick: () => void;
  variant: ModalActionButtonVariant;
  fontSize?: number;
};

export default function ModalActionButton({
  label,
  onClick,
  variant,
  fontSize = 14,
}: ModalActionButtonProps) {
  const isCancel = variant === "cancel";
  const isDisabled = variant === "primaryDisabled";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 font-normal transition-opacity",
        isCancel
          ? "border border-gray-300 bg-transparent text-gray-800 cursor-pointer hover:bg-gray-100"
          : isDisabled
            ? "cursor-not-allowed bg-gray-400 text-white"
            : "cursor-pointer bg-gray-900 text-white hover:opacity-90",
      ].join(" ")}
      style={{fontSize}}
    >
      {label}
    </button>
  );
}