<template>
  <div>
    <!-- Planet Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        :title="planet.name"
        description="Planet Information"
        :details="{
          'Rotation Period': planet.rotation_period + ' hours',
          'Orbital Period': planet.orbital_period + ' days',
          Diameter: planet.diameter + ' km',
          Climate: planet.climate,
          Gravity: planet.gravity,
          Terrain: planet.terrain,
          'Surface Water': planet.surface_water + '%',
          Population: planet.population
        }"
        :isList="false"
      />

      <DetailCard
        v-if="residents.length > 0"
        title="Residents"
        description="Inhabitants of the Planet"
        :items="residents.map(resident => ({
          ...resident,
          url: `/characters/${getIdFromUrl(resident.url)}`
        }))"
        :isList="true"
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Skeleton } from '@/components/ui/skeleton';


const route = useRoute();
const planetId = route.params.id;

const planet = ref({});
const residents = ref([]);
const films = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

onMounted(async () => {
  try {
    const planetData = await fetchData(`https://swapi.py4e.com/api/planets/${planetId}/`);
    planet.value = planetData;

    const residentPromises = planetData.residents.map(fetchData);
    residents.value = await Promise.all(residentPromises);

    const filmPromises = planetData.films.map(fetchData);
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