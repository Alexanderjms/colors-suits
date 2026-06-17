"use client";

interface ColorSwatchProps {
  hex: string;
  name: string;
  selected: boolean;
  compatible: boolean;
  onClick: () => void;
}

export default function ColorSwatch({
  hex,
  name,
  selected,
  compatible,
  onClick,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex cursor-pointer flex-col items-center gap-1 rounded-lg p-1.5 sm:p-2
        transition-all duration-200 ease-out
        ${selected ? "bg-[var(--color-selected)] ring-2 ring-[var(--color-primary)]" : "hover:bg-[var(--color-primary)]/5"}
        ${!compatible ? "opacity-30" : ""}
      `}
      style={{ opacity: !compatible ? 0.3 : undefined }}
      disabled={!compatible}
    >
      <span
        className="block h-8 w-8 rounded-md ring-1 ring-black/5 sm:h-10 sm:w-10 sm:rounded-lg"
        style={{ backgroundColor: hex }}
      />
      <span
        className={`text-[10px] leading-tight tracking-tight sm:text-[11px] ${selected ? "font-medium text-[var(--color-primary)]" : "text-[var(--color-muted)]"}`}
      >
        {name}
      </span>
    </button>
  );
}
