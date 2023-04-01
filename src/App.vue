<script setup>
import SideBar from "./cmps/side-bar.vue";
import PostModal from "./pages/post-modal.vue"
import { userService } from "./services/user.service";
</script>

<template>
  <section class="main-layout">
    <!-- <SideBar /> -->
    <!-- <header class="full"></header> -->

   
      <RouterView />
    
    <PostModal v-if="this.$store.getters.isPostModalOpen"/>
    <SideBar v-if="this.$store.getters.User" />
  </section>
</template>
