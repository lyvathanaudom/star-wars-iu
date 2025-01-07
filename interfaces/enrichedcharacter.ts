import type { Character } from "./character"; // Ensure the correct import path

interface EnrichedCharacter extends Character {
  speciesName: string;
  homeworldName: string;
}

export type { EnrichedCharacter };
