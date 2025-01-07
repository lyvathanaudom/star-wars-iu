import { defineStore } from "pinia";

export const useStarWarsStore = defineStore("starWars", {
  state: () => ({
    data: {
      characters: { list: [] as Array<any>, next: null as string | null, previous: null as string | null },
      films: { list: [] as Array<any>, next: null as string | null, previous: null as string | null },
      planets: { list: [] as Array<any>, next: null as string | null, previous: null as string | null },
      species: { list: [] as Array<any>, next: null as string | null, previous: null as string | null },
      starships: { list: [] as Array<any>, next: null as string | null, previous: null as string | null },
      vehicles: { list: [] as Array<any>, next: null as string | null, previous: null as string | null },
    },
    enrichedCharacters: [] as Array<any>, // Characters with species and homeworld details
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchData(resource: keyof typeof this.data, url: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch(url);
        this.data[resource].list = response.results;
        this.data[resource].next = response.next;
        this.data[resource].previous = response.previous;
      } catch (error) {
        this.error = error instanceof Error ? error.message : String(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCharacters(url: string = "https://swapi.py4e.com/api/people") {
      await this.fetchData("characters", url);
      await this.enrichCharacters();
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

    async fetchNextPage(resource: keyof typeof this.data) {
      const nextPage = this.data[resource].next;
      if (nextPage) {
        await this.fetchData(resource, nextPage);
      }
    },

    async fetchPreviousPage(resource: keyof typeof this.data) {
      const previousPage = this.data[resource].previous;
      if (previousPage) {
        await this.fetchData(resource, previousPage);
      }
    },

    async enrichCharacters() {
      this.enrichedCharacters = await Promise.all(
        this.data.characters.list.map(async (character) => {
          const speciesName = character.species.length
            ? await this.fetchName(character.species[0], "Unknown")
            : "Unknown";
          const homeworldName = character.homeworld
            ? await this.fetchName(character.homeworld, "Unknown")
            : "Unknown";
          return { ...character, speciesName, homeworldName };
        })
      );
    },

    async fetchName(url: string, fallback: string): Promise<string> {
      try {
        const response = await $fetch(url);
        return response.name;
      } catch {
        return fallback;
      }
    },
  },
});
