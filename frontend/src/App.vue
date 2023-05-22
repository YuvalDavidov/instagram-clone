<script setup>
import SideBar from "./cmps/side-bar.vue";
</script>

<template>
  <section class="main-layout">
    <!-- <SideBar /> -->
    <!-- <header class="full"></header> -->

    <RouterView />

    <SideBar v-if="this.$store.getters.User" />
  </section>
</template>
// v-bind:class="{ darkMode: this.$store.getters.GetIsDarkMode }"