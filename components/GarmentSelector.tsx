"use client";

import type { GarmentType, SelectionState } from "@/lib/colors";
import { getGarments, getCompatibility } from "@/lib/colors";
import { Icon } from "@iconify/react";
import ColorSwatch from "./ColorSwatch";

const ICON_NAMES: Record<GarmentType, string> = {
  shirt: "tabler:shirt",
  pants: "ph:pants",
  shoes: "tabler:shoe",
};

const LABELS: Record<GarmentType, string> = {
  shirt: "Camisa",
  pants: "Pantalón",
  shoes: "Zapatos",
};

interface GarmentSelectorProps {
  type: GarmentType;
  selection: SelectionState;
  onSelect: (type: GarmentType, id: string) => void;
}

export default function GarmentSelector({
  type,
  selection,
  onSelect,
}: GarmentSelectorProps) {
  const items = getGarments(type);
  const iconName = ICON_NAMES[type];
  const title = LABELS[type];
  const selectedId = selection[type];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-[var(--color-muted)]">
        <Icon icon={iconName} width={16} height={16} />
        {title}
      </h2>
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-5">
        {items.map((item) => {
          const compatibility = getCompatibility(type, item.id, selection);
          const isCompatible = compatibility !== "incompatible";
          const isSelected = selectedId === item.id;

          return (
            <ColorSwatch
              key={item.id}
              hex={item.hex}
              name={item.name}
              selected={isSelected}
              compatible={isCompatible}
              onClick={() => onSelect(type, item.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
