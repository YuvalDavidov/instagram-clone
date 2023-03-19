<template>
  <section class="user-profile">
    {{ username }}
  </section>
</template>

<script>
import { userService } from "../services/user.service";
export default {
  data() {
    return {
      username: null,
      user: userService.getUserByUsername(username),
    };
  },
  created() {
    this.username = this.$route.params.username;
  },
};
</script>

<style>
</style>