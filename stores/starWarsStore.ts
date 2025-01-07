import { defineStore } from "pinia";

export const useStarWarsStore = defineStore("starWars", {
  state: () => ({
    characters: [] as Array<any>,
    films: [] as Array<any>,
    planets: [] as Array<any>,
    species: [] as Array<any>,
    starships: [] as Array<any>,
    vehicles: [] as Array<any>,
    charactersWithSpecies: [] as Array<any>,
    loading: false,
    error: null as string | null,
    nextPage: null as string | null,
    previousPage: null as string | null,
  }),
  actions: {
    async fetchCharacters(url: string = "https://swapi.py4e.com/api/people") {
      await this.fetchData("characters", url);
      await this.loadCharactersWithSpeciesAndHomeworld();
    },
    async fetchFilms(url: string = "https://swapi.py4e.com/api/films") {
      await this.fetchData("films", url);
    },
    async fetchPlanets(url: string = "https://swapi.py4e.com/api/planets") {
      await this.fetchData("planets", url);
    },
    async fetchSpecies(url: string = "https://swapi.py4e.com/api/species") {
      await this.fetchData("species", url);
    },
    async fetchStarships(url: string = "https://swapi.py4e.com/api/starships") {
      await this.fetchData("starships", url);
    },
    async fetchVehicles(url: string = "https://swapi.py4e.com/api/vehicles") {
      await this.fetchData("vehicles", url);
    },
    async fetchData(key: string, endpoint: string) {
      this.loading = true;
      this.error = null;
      try {
        const data = await $fetch(endpoint);
        this[key] = data.results;
        this.nextPage = data.next;
        this.previousPage = data.previous;
      } catch (error) {
        this.error = error instanceof Error ? error.message : String(error);
      } finally {
        this.loading = false;
      }
    },
    async loadCharactersWithSpeciesAndHomeworld() {
      this.charactersWithSpecies = await Promise.all(
        this.characters.map(async (character) => {
          const speciesName = character.species.length > 0
            ? await this.fetchSpeciesName(character.species[0])
            : 'Unknown';
          const homeworldName = character.homeworld
            ? await this.fetchHomeworldName(character.homeworld)
            : 'Unknown';
          return { ...character, speciesName, homeworldName };
        })
      );
    },
    async fetchSpeciesName(url: string) {
      try {
        const response = await $fetch(url);
        return response.name;
      } catch {
        return 'Unknown';
      }
    },
    async fetchHomeworldName(url: string) {
      try {
        const response = await $fetch(url);
        return response.name;
      } catch {
        return 'Unknown';
      }
    },
    async fetchMoreCharacters() {
      if (this.nextPage) {
        await this.fetchCharacters(this.nextPage);
      }
    },
    async fetchPreviousCharacters() {
      if (this.previousPage) {
        await this.fetchCharacters(this.previousPage);
      }
    },
  },
});