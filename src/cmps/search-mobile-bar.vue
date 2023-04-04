<template>
  <section class="search-mobile-bar">
    <UsersList @onCloseMobileSearch="onCloseMobileSearch" />
  </section>
</template>

<script>
import UsersList from "./users-list.vue";

export default {
  methods: {
    onCloseMobileSearch() {
      this.$emit("onCloseMobileSearch");
    },
  },
  components: {
    UsersList,
  },
};
</script>

<style>
</style>