<script setup>
import SideBar from "./cmps/side-bar.vue";
import {userService} from "./services/user.service"
</script>

<template>
  <section class="main-layout">
    <header class="full"></header>

    <main>
      <RouterView />
    </main>

    <SideBar v-if="userService.user()"/>
  </section>
</template>
