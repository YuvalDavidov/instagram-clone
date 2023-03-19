<script setup>
import SideBar from "./cmps/side-bar.vue";
import { userService } from "./services/user.service";
</script>

<template>
  <section class="main-layout">
    <!-- <SideBar /> -->
    <!-- <header class="full"></header> -->

   
      <RouterView />
    

    <SideBar v-if="userService.user()" />
  </section>
</template>
