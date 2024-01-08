<script setup>
import SideBar from "./cmps/side-bar.vue";
import Loader from "./components/loader.vue";
import { myStore } from './store/store'
</script>

<template>
  <section class="main-layout">
    <Loader v-if="myStore.getters.IsLoading"/>
    <RouterView />
    <SideBar v-if="myStore.getters.User" />
  </section>
</template>
// v-bind:class="{ darkMode: this.$store.getters.GetIsDarkMode }"