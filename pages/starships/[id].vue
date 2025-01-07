<template>
  <div>
    <!-- Starship Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        :title="starship.name"
        description="Starship Information"
        :details="{
          Model: starship.model,
          Manufacturer: starship.manufacturer,
          'Cost in Credits': starship.cost_in_credits,
          Length: starship.length + ' meters',
          'Max Atmosphering Speed': starship.max_atmosphering_speed,
          Crew: starship.crew,
          Passengers: starship.passengers,
          'Cargo Capacity': starship.cargo_capacity + ' kg',
          Consumables: starship.consumables,
          'Hyperdrive Rating': starship.hyperdrive_rating,
          MGLT: starship.MGLT,
          'Starship Class': starship.starship_class
        }"
        :isList="false"
      />

      <DetailCard
        v-if="films.length > 0"
        title="Films"
        description="Appearances in Films"
        :items="films.map(film => ({
          ...film,
          url: `/films/${getIdFromUrl(film.url)}`
        }))"
        :isList="true"
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStarWarsStore } from "@/stores/starWarsStore";
import { Skeleton } from "@/components/ui/skeleton";
import DetailCard from "@/components/DetailCard";

const route = useRoute();
const starshipId = route.params.id;

const starship = ref({});
const films = ref([]);
const loading = ref(true);
const error = ref(null);

const starWarStore = useStarWarsStore();

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

onMounted(async () => {
  try {
    const starshipData = await fetchData(`https://swapi.py4e.com/api/starships/${starshipId}/`);
    starship.value = starshipData;

    const filmPromises = starshipData.films.map(fetchData);
    films.value = await Promise.all(filmPromises);

    loading.value = false;
  } catch (err) {
    error.value = err.message || "Failed to fetch data.";
    loading.value = false;
  }
});

function getIdFromUrl(url) {
  return url.split("/").filter(Boolean).pop();
}
</script>