<script setup>
import SideBar from "./cmps/side-bar.vue";
import {myStore} from './store/store'
</script>

<template>
  <section class="main-layout">
    <RouterView />
    <SideBar v-if="myStore.getters.User" />
  </section>
</template>
// v-bind:class="{ darkMode: this.$store.getters.GetIsDarkMode }"