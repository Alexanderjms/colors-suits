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
      <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--color-outline)] p-8 text-center">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="h-20 w-24">
            <ShirtShape color={null} />
          </div>
          <div className="h-24 w-20">
            <PantsShape color={null} />
          </div>
          <div className="h-12 w-28">
            <ShoeShape color={null} />
          </div>
        </div>
        <p className="text-sm text-[var(--color-muted)]">
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
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-[var(--color-surface)] p-6 ring-1 ring-black/5">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-1">
            <div className="h-28 w-32 text-[var(--color-ink)]">
              <ShirtShape color={shirt?.hex ?? null} />
            </div>
            {shirt && (
              <span className="text-xs font-medium text-[var(--color-muted)]">
                {shirt.name}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="h-32 w-28 text-[var(--color-ink)]">
              <PantsShape color={pants?.hex ?? null} />
            </div>
            {pants && (
              <span className="text-xs font-medium text-[var(--color-muted)]">
                {pants.name}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="h-16 w-36 text-[var(--color-ink)]">
              <ShoeShape color={shoes?.hex ?? null} />
            </div>
            {shoes && (
              <span className="text-xs font-medium text-[var(--color-muted)]">
                {shoes.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
