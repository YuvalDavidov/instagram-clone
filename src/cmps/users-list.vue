<template>
  <section class="users-list">
    <li
      v-for="(user, index) in searchedUsers"
      :key="index"
      @click="moveTo(user.userId)"
    >
      <img class="user-img" :src="user.imgUrl" alt="" />
      <div class="user-info">
        <span>{{ user.username }}</span>
        <span>{{ user.fullname }}</span>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  methods: {
    moveTo(userId) {
      console.log(userId);
      this.$router.push(`/profile/${userId}`);
      this.$emit("onToggleSearch");
    },
  },
  computed: {
    searchedUsers() {
      return this.$store.getters.filterdByUsers;
    },
  },
};
</script>

<style>
</style>