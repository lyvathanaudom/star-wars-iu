<template>
  <div class="bg-black text-white min-h-[100vh]">
    <NavBar />
    <div :class="pageClasses">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
// Access the current route
const route = useRoute();

// Compute the classes for the page container
const pageClasses = computed(() => {
  // Add 'px-[5%]' if the current route is not '/'
  return route.path !== '/' ? 'px-[5%] pt-20' : 'pt-0';
});
</script>