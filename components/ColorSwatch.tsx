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
        group flex cursor-pointer flex-col items-center gap-1.5 rounded-xl p-2
        transition-all duration-200 ease-out
        ${selected ? "bg-[var(--color-selected)] ring-2 ring-[var(--color-primary)]" : "hover:bg-[var(--color-primary)]/5"}
        ${!compatible ? "opacity-30" : ""}
      `}
      style={{ opacity: !compatible ? 0.3 : undefined }}
      disabled={!compatible}
    >
      <span
        className="block h-10 w-10 rounded-lg ring-1 ring-black/5"
        style={{ backgroundColor: hex }}
      />
      <span
        className={`text-[11px] leading-tight tracking-tight ${selected ? "font-medium text-[var(--color-primary)]" : "text-[var(--color-muted)]"}`}
      >
        {name}
      </span>
    </button>
  );
}
