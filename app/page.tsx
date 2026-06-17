"use client";

import { useState, useCallback } from "react";
import type { GarmentType, SelectionState } from "@/lib/colors";
import {
  getMatchingPants,
  getMatchingShoes,
  getPantsForShoes,
  getShirtsForPants,
} from "@/lib/colors";
import GarmentSelector from "@/components/GarmentSelector";
import OutfitPreview from "@/components/OutfitPreview";
import ReferencePhotos from "@/components/ReferencePhotos";

export default function Home() {
  const [selection, setSelection] = useState<SelectionState>({
    shirt: null,
    pants: null,
    shoes: null,
  });

  const handleSelect = useCallback(
    (type: GarmentType, id: string) => {
      setSelection((prev) => {
        const next = { ...prev };

        if (next[type] === id) {
          next[type] = null;
          return next;
        }

        next[type] = id;

        if (type === "shirt") {
          const validPants = getMatchingPants(id);
          if (next.pants && !validPants.includes(next.pants)) {
            next.pants = null;
            next.shoes = null;
          }
          if (next.pants) {
            const validShoes = getMatchingShoes(next.pants);
            if (next.shoes && !validShoes.includes(next.shoes)) {
              next.shoes = null;
            }
          }
        }

        if (type === "pants") {
          const validShirts = getShirtsForPants(id);
          const validShoes = getMatchingShoes(id);
          if (next.shirt && !validShirts.includes(next.shirt)) {
            next.shirt = null;
          }
          if (next.shoes && !validShoes.includes(next.shoes)) {
            next.shoes = null;
          }
        }

        if (type === "shoes") {
          const validPants = getPantsForShoes(id);
          if (next.pants && !validPants.includes(next.pants)) {
            next.pants = null;
          }
          if (next.pants) {
            const validShirts = getShirtsForPants(next.pants);
            if (next.shirt && !validShirts.includes(next.shirt)) {
              next.shirt = null;
            }
          }
        }

        return next;
      });
    },
    [],
  );

  const handleClear = useCallback(() => {
    setSelection({ shirt: null, pants: null, shoes: null });
  }, []);

  const hasSelection = selection.shirt || selection.pants || selection.shoes;

  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Combinador de Outfits
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Seleccioná colores para descubrir combinaciones
        </p>
      </header>

      <div className="grid flex-1 gap-8 md:grid-cols-[1fr_280px] md:gap-10">
        <div className="flex flex-col gap-8">
          <GarmentSelector
            type="shirt"
            selection={selection}
            onSelect={handleSelect}
          />
          <GarmentSelector
            type="pants"
            selection={selection}
            onSelect={handleSelect}
          />
          <GarmentSelector
            type="shoes"
            selection={selection}
            onSelect={handleSelect}
          />
        </div>

        <aside className="flex flex-col gap-6 md:sticky md:top-8 md:self-start">
          <OutfitPreview selection={selection} />
          {hasSelection && (
            <button
              type="button"
              onClick={handleClear}
              className="self-start rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors duration-200 ease-out hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-ink)]"
            >
              Limpiar selección
            </button>
          )}
          <ReferencePhotos selection={selection} />
        </aside>
      </div>

      <footer className="mt-12 border-t border-[var(--color-outline)] py-6 text-center text-xs text-[var(--color-muted)]">
        Combinador de Outfits — combinaciones clásicas de moda
      </footer>
    </div>
  );
}
