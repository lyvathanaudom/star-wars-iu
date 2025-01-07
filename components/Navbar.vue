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
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Navigation Links -->
      <ul
        :class="[
          'md:flex justify-center list-none p-0 m-0 gap-4',
          menuOpen ? 'block md:flex bg-black text-center w-full h-[100vh] flex-col justify-center' : 'hidden md:flex',
          'absolute md:static top-full md:top-auto left-0 transition-all duration-300',
        ]"
      >
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink
            :to="link.to"
            class="text-white  mx-2 text-lg md:text-sm text-xl transition-colors duration-300 hover:text-white"
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
import { ref } from "vue";

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
