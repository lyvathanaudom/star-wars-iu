<template>
  <header>

    <nav
      class="px-[5%] py-3 flex justify-between items-center fixed z-50 bg-black left-0 right-0"
    >
      <NuxtLink to="/" class="mx-2">
        <img
          src="https://pngimg.com/d/star_wars_logo_PNG34.png"
          alt="Star Wars Logo"
          class="h-10"
        />
      </NuxtLink>
      <ul class="md:flex gap-8 hidden">
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink
            @click="menuOpen = false"
            :to="link.to"
            class="hover:text-yellow-400"
            active-class="text-white font-bold"
            exact-active-class="text-yellow-400 font-bold"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden text-yellow-400 focus:outline-none z-60 relative"
        aria-label="Toggle navigation menu"
      >
        <Menu v-if="!menuOpen" />
        <X v-else />
      </button>
    </nav>
    <ul
      v-if="menuOpen"
      class="md:hidden gap-4 flex fixed flex-col items-center top-0 pt-8 left-4 bg-black w-full z-49 h-[100vh]"
    >
      <li v-for="(link, index) in links" :key="index">
        <NuxtLink
          @click="menuOpen = false"
          :to="link.to"
          class="hover:text-yellow-400 text-2xl"
          active-class="text-white font-bold"
          exact-active-class="text-yellow-400 font-bold"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { X, Menu } from "lucide-vue-next";

// State Variables
const menuOpen = ref(false);

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
