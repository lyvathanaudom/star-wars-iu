<template>
  <header
    class="fixed top-0 w-full px-[5%] md:py-3 py-2 bg-transparent backdrop-blur text-center z-50"
  >
    <nav class="flex items-center justify-between">
      <!-- Star Wars Logo -->
      <NuxtLink to="/" class="mx-2">
        <img
          src="https://pngimg.com/d/star_wars_logo_PNG34.png"
          alt="Star Wars Logo"
          class="h-10"
        />
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden text-yellow-400 focus:outline-none"
      >
        <Menu v-if="!menuOpen" />
        
        <X v-else />
      </button>

      <!-- Navigation Links -->
      <ul
        :class="[
          'md:flex justify-center list-none p-0 m-0 gap-4',
          menuOpen ? 'block md:flex bg-black text-center w-full h-[100vh] flex-col justify-center' : 'hidden md:flex',
          'absolute md:static top-full md:top-auto left-0 mt-6',
        ]"
      >
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink
          @click="menuOpen = false"
            :to="link.to"
            class="text-white mx-2 text-lg md:text-sm text-xl hover:text-white"
            active-class="text-white font-bold"
            exact-active-class="text-yellow-400 font-bold"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { X, Menu } from 'lucide-vue-next';

// State Variables
const menuOpen = ref(false);

// Toggle Menu Visibility
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Navigation Links
const links = [
  { to: "/films", label: "Films" },
  { to: "/characters", label: "Characters" },
  { to: "/species", label: "Species" },
  { to: "/starships", label: "Starships" },
  { to: "/planets", label: "Planets" },
  { to: "/vehicles", label: "Vehicles" },
];
</script>
