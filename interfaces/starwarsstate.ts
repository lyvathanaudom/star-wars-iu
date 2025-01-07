import type { ResourceCollection } from "./resource-collection";
import type { Film } from "./film";
import type { Planet } from "./planet";
import type { Species } from "./species";
import type { Character } from "./character";
import type { Starship } from "./starship";
import type { Vehicle } from "./vehicle";
import type { EnrichedCharacter } from "./enrichedcharacter";
interface StarWarsState {
  data: {
    characters: ResourceCollection<Character>;
    films: ResourceCollection<Film>;
    planets: ResourceCollection<Planet>;
    species: ResourceCollection<Species>;
    starships: ResourceCollection<Starship>;
    vehicles: ResourceCollection<Vehicle>;
  };
  enrichedCharacters: EnrichedCharacter[];
  loading: boolean;
  error: string | null;
}

export type { StarWarsState };
