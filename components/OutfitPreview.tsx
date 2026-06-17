"use client";

import type { SelectionState } from "@/lib/colors";
import { getItem } from "@/lib/colors";
import { ShirtShape, PantsShape, ShoeShape } from "./GarmentShape";

interface OutfitPreviewProps {
  selection: SelectionState;
}

export default function OutfitPreview({ selection }: OutfitPreviewProps) {
  const shirt = selection.shirt ? getItem("shirt", selection.shirt) : null;
  const pants = selection.pants ? getItem("pants", selection.pants) : null;
  const shoes = selection.shoes ? getItem("shoes", selection.shoes) : null;

  const hasSelection = shirt || pants || shoes;

  if (!hasSelection) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--color-outline)] p-6 text-center sm:p-8">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="h-16 w-20 sm:h-20 sm:w-24">
            <ShirtShape color={null} />
          </div>
          <div className="h-20 w-16 sm:h-24 sm:w-20">
            <PantsShape color={null} />
          </div>
          <div className="h-10 w-24 sm:h-12 sm:w-28">
            <ShoeShape color={null} />
          </div>
        </div>
        <p className="text-xs text-[var(--color-muted)] sm:text-sm">
          Seleccioná colores para ver la combinación
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium tracking-wide uppercase text-[var(--color-muted)]">
        Vista previa
      </h2>
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-[var(--color-surface)] p-4 ring-1 ring-black/5 sm:p-6">
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center gap-1">
            <div className="h-24 w-28 text-[var(--color-ink)] sm:h-28 sm:w-32">
              <ShirtShape color={shirt?.hex ?? null} />
            </div>
            {shirt && (
              <span className="text-[10px] font-medium text-[var(--color-muted)] sm:text-xs">
                {shirt.name}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="h-28 w-24 text-[var(--color-ink)] sm:h-32 sm:w-28">
              <PantsShape color={pants?.hex ?? null} />
            </div>
            {pants && (
              <span className="text-[10px] font-medium text-[var(--color-muted)] sm:text-xs">
                {pants.name}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="h-14 w-32 text-[var(--color-ink)] sm:h-16 sm:w-36">
              <ShoeShape color={shoes?.hex ?? null} />
            </div>
            {shoes && (
              <span className="text-[10px] font-medium text-[var(--color-muted)] sm:text-xs">
                {shoes.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
