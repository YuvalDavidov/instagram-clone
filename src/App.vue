<script setup>
import SideBar from "./cmps/side-bar.vue";
import { userService } from "./services/user.service";
</script>

<template>
  <SideBar />
  <section class="main-layout">
    <main>
      <RouterView />
    </main>

    <SideBar v-if="userService.user()" />
  </section>
</template>
