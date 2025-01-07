<template>
  <div>
    <!-- Film Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        v-if="film.title"
        :title="film.title"
        description="Film Information"
        :details="{
          'Episode': film.episode_id,
          'Director': film.director,
          'Producer': film.producer,
          'Release Date': film.release_date,
        }"
        :isList="false"
      />

      <DetailCard
        v-if="film.opening_crawl"
        title="Opening Crawl"
        description="Introduction"
        :details="{ 'Opening Crawl': film.opening_crawl }"
        :isList="false"
      />

      <DetailCard
        v-if="characters.length > 0"
        title="Characters"
        description="Characters in Film"
        :items="characters"
        :isList="true"
        @navigate="navigateTo"
      />

      <DetailCard
        v-if="planets.length > 0"
        title="Planets"
        description="Planets Featured"
        :items="planets"
        :isList="true"
        @navigate="navigateTo"
      />

      <DetailCard
        v-if="starships.length > 0"
        title="Starships"
        description="Starships Featured"
        :items="starships"
        :isList="true"
        @navigate="navigateTo"
      />

      <DetailCard
        v-if="vehicles.length > 0"
        title="Vehicles"
        description="Vehicles Featured"
        :items="vehicles"
        :isList="true"
        @navigate="navigateTo"
      />

      <DetailCard
        v-if="species.length > 0"
        title="Species"
        description="Species Featured"
        :items="species"
        :isList="true"
        @navigate="navigateTo"
      />
    </div>
    <div v-if="loading" class="flex flex-col space-y-3 mt-20">
      <Skeleton class="bg-gray-800 h-[50px] w-[250px] rounded-xl" />
      <Skeleton class="bg-gray-800 h-[20px] w-[200px] rounded-xl" />

      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px] bg-gray-800" />
        <Skeleton class="h-4 w-[200px] bg-gray-800" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DetailCard from "@/components/DetailCard.vue";
import { Skeleton } from "@/components/ui/skeleton";

const route = useRoute();
const router = useRouter();
const filmId = route.params.id;

const film = ref({});
const characters = ref([]);
const planets = ref([]);
const starships = ref([]);
const vehicles = ref([]);
const species = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function loadFilmData() {
  try {
    const filmData = await fetchData(`https://swapi.py4e.com/api/films/${filmId}/`);
    film.value = filmData;

    const characterPromises = filmData.characters.map(fetchData);
    characters.value = await Promise.all(characterPromises);

    const planetPromises = filmData.planets.map(fetchData);
    planets.value = await Promise.all(planetPromises);

    const starshipPromises = filmData.starships.map(fetchData);
    starships.value = await Promise.all(starshipPromises);

    const vehiclePromises = filmData.vehicles.map(fetchData);
    vehicles.value = await Promise.all(vehiclePromises);

    const speciesPromises = filmData.species.map(fetchData);
    species.value = await Promise.all(speciesPromises);

    loading.value = false;
  } catch (err) {
    error.value = err.message || "Failed to fetch data.";
    loading.value = false;
  }
}

loadFilmData();

function navigateTo(url) {
  const segments = url.split("/").filter(Boolean);
  const type = segments.at(-2);
  const id = segments.at(-1);

  const routeTypeMap = {
    people: "characters",
    // Add other mappings if needed
  };

  const routeType = routeTypeMap[type] || type;

  if (routeType && id) {
    router.push(`/${routeType}/${id}`);
  } else {
    console.error("Invalid URL:", url);
  }
}
</script>