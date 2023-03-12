<script setup>
import SideBar from "./cmps/side-bar.vue";
</script>

<template>
  <section class="main-layout">
    <header class="full"></header>

    <main>
      <RouterView />
    </main>

    <SideBar />
  </section>
</template>
