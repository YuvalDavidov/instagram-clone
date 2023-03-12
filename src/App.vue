<script setup>
import SideBar from "./cmps/side-bar.vue";
</script>

<template>
  <SideBar />
  <section class="main-layout">
    <main>
      <RouterView />
    </main>
  </section>
</template>
