import data from "@/data/combinations.json";

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
}

export type GarmentType = "shirt" | "pants" | "shoes";

const GARMENT_KEYS: Record<GarmentType, "shirts" | "pants" | "shoes"> = {
  shirt: "shirts",
  pants: "pants",
  shoes: "shoes",
};

export interface SelectionState {
  shirt: string | null;
  pants: string | null;
  shoes: string | null;
}

export type MatchMap = Record<string, string[]>;

function invertMap(map: MatchMap): MatchMap {
  const inverted: MatchMap = {};
  for (const [key, values] of Object.entries(map)) {
    for (const val of values) {
      if (!inverted[val]) inverted[val] = [];
      if (!inverted[val].includes(key)) inverted[val].push(key);
    }
  }
  return inverted;
}

const shirtPants: MatchMap = data.rules.shirtPants;
const pantsShoes: MatchMap = data.rules.pantsShoes;
const pantsFromShoes: MatchMap = invertMap(pantsShoes);
const shirtsFromPants: MatchMap = invertMap(shirtPants);

export function getGarments(type: GarmentType): ColorItem[] {
  return data[GARMENT_KEYS[type]] as ColorItem[];
}

export function getItem(type: GarmentType, id: string): ColorItem | undefined {
  return (data[GARMENT_KEYS[type]] as ColorItem[]).find((c) => c.id === id);
}

export function getMatchingPants(shirtId: string): string[] {
  return shirtPants[shirtId] ?? [];
}

export function getMatchingShoes(pantsId: string): string[] {
  return pantsShoes[pantsId] ?? [];
}

export function getPantsForShoes(shoesId: string): string[] {
  return pantsFromShoes[shoesId] ?? [];
}

export function getShirtsForPants(pantsId: string): string[] {
  return shirtsFromPants[pantsId] ?? [];
}

export function getCompatibility(
  type: GarmentType,
  id: string,
  selection: SelectionState,
): "compatible" | "incompatible" | "neutral" {
  switch (type) {
    case "shirt": {
      if (selection.pants && selection.shoes) {
        const pantsForShoes = getPantsForShoes(selection.shoes);
        if (!pantsForShoes.includes(selection.pants)) return "incompatible";
        const shirtsForPants = getShirtsForPants(selection.pants);
        return shirtsForPants.includes(id) ? "compatible" : "incompatible";
      }
      if (selection.pants) {
        const shirts = getShirtsForPants(selection.pants);
        return shirts.includes(id) ? "compatible" : "incompatible";
      }
      if (selection.shoes) {
        const pantsForShoes = getPantsForShoes(selection.shoes);
        const compatibleShirts = new Set<string>();
        for (const p of pantsForShoes) {
          for (const s of getShirtsForPants(p)) {
            compatibleShirts.add(s);
          }
        }
        return compatibleShirts.has(id) ? "compatible" : "incompatible";
      }
      return "neutral";
    }
    case "pants": {
      if (selection.shirt && selection.shoes) {
        const shoesForPants = getMatchingShoes(selection.shirt);
        const validPants = new Set(shoesForPants);
        const pantsForShoes = getPantsForShoes(selection.shoes);
        for (const p of pantsForShoes) if (validPants.has(p)) validPants.add(p);
        const matching = getMatchingPants(selection.shirt);
        const filtered = matching.filter((p) => pantsForShoes.includes(p));
        return filtered.includes(id) ? "compatible" : "incompatible";
      }
      if (selection.shirt) {
        const pants = getMatchingPants(selection.shirt);
        return pants.includes(id) ? "compatible" : "incompatible";
      }
      if (selection.shoes) {
        const pants = getPantsForShoes(selection.shoes);
        return pants.includes(id) ? "compatible" : "incompatible";
      }
      return "neutral";
    }
    case "shoes": {
      if (selection.pants) {
        const shoes = getMatchingShoes(selection.pants);
        return shoes.includes(id) ? "compatible" : "incompatible";
      }
      return "neutral";
    }
  }
}
