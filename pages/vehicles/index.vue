<template>
  <div class="pb-10">
    <div class="flex justify-between py-6">
      <h1 class="md:text-4xl text-2xl text-yellow-500 font-bold">Vehicles</h1>
      <PaginationComponent
        :total="totalVehicles"
        :previousPage="starWarStore.data.vehicles.previous"
        :nextPage="starWarStore.data.vehicles.next"
        @page-change="handlePageChange"
      />
    </div>

    <div
      v-if="!starWarStore.loading"
      class="grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <ItemCard
        v-for="vehicle in starWarStore.data.vehicles.list"
        :key="vehicle.url"
        :title="vehicle.name"
        :link="`/vehicles/${getVehicleId(vehicle.url)}`"
      >
        <div class="flex gap-1 items-center">
          <Truck class="w-3" />
          <div class="text-xs">{{ vehicle.model || "Unknown" }}</div>
        </div>
        <div class="flex gap-1 items-center">
          <UsersRound class="w-3" />
          <div class="text-xs">{{ vehicle.passengers || "0" }} Passengers</div>
        </div>
      </ItemCard>
    </div>
    <div v-if="starWarStore.loading" class="flex items-center space-x-4">
      <Skeleton class="h-16 w-16 bg-gray-800 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 bg-gray-800 w-[250px]" />
        <Skeleton class="h-4 bg-gray-800 w-[200px]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStarWarsStore } from '@/stores/starWarsStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Truck, UsersRound } from 'lucide-vue-next';

const starWarStore = useStarWarsStore();
const totalVehicles = ref(0);

onMounted(async () => {
  if (starWarStore.data.vehicles.list.length === 0) {
    await starWarStore.fetchVehicles();
  }
  try {
    const response = await fetch("https://swapi.py4e.com/api/vehicles/");
    const data = await response.json();
    totalVehicles.value = data.count;
  } catch (error) {
    console.error("Failed to fetch total vehicles:", error);
  }
});

const handlePageChange = async (page: string | number) => {
  const pageUrl = `https://swapi.py4e.com/api/vehicles/?page=${page}`;
  await starWarStore.fetchVehicles(pageUrl);
};

const getVehicleId = (vehicleUrl: string) => {
  return vehicleUrl.split("/").filter(Boolean).pop() || '';
};
</script>