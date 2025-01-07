<template>
  <div>
    <!-- Vehicle Details -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailCard
        :title="vehicle.name"
        description="Vehicle Information"
        :details="{
          Model: vehicle.model,
          Manufacturer: vehicle.manufacturer,
          'Cost in Credits': vehicle.cost_in_credits,
          Length: vehicle.length + ' meters',
          'Max Atmosphering Speed': vehicle.max_atmosphering_speed,
          Crew: vehicle.crew,
          Passengers: vehicle.passengers,
          'Cargo Capacity': vehicle.cargo_capacity + ' kg',
          Consumables: vehicle.consumables,
          'Vehicle Class': vehicle.vehicle_class
        }"
        :isList="false"
      />

      <DetailCard
      v-if="films.length > 0"
        title="Films"
        description="Appearances in Films"
        :items="films"
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DetailCard from "@/components/DetailCard.vue";

const route = useRoute();
const router = useRouter();
const vehicleId = route.params.id;

const vehicle = ref({});
const films = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

onMounted(async () => {
  try {
    const vehicleData = await fetchData(
      `https://swapi.py4e.com/api/vehicles/${vehicleId}/`
    );
    vehicle.value = vehicleData;

    const filmPromises = vehicleData.films.map((url) => fetchData(url));
    films.value = await Promise.all(filmPromises);

    loading.value = false;
  } catch (err) {
    error.value = err.message || "Failed to fetch data.";
    loading.value = false;
  }
});

function navigateTo(url) {
  const segments = url.split("/").filter(Boolean);
  const type = segments.at(-2);
  const id = segments.at(-1);
  if (type && id) {
    router.push(`/${type}/${id}`);
  } else {
    console.error("Invalid URL:", url);
  }
}
</script>