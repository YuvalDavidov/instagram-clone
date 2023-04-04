<template>
  <section class="users-list">
    <li
      v-for="(user, index) in filterdByUsers"
      :key="index"
      @click="moveTo(user)"
    >
      <img class="user-img" :src="user.imgUrl" alt="" />
      <div class="user-info">
        <span>{{ user.username }}</span>
        <span>{{ user.fullname }}</span>
      </div>
    </li>
    <!-- <li
      v-if="filterdByUsers"
      v-for="(user, index) in searchedUsers"
      :key="index"
    ></li> -->
  </section>
</template>

<script>
export default {
  methods: {
    moveTo(user) {
      this.$store.dispatch({
        type: "addSearchedUser",
        user,
      });
      this.$router.push(`/profile/${user.userId}`);
      this.$emit("onToggleSearch");
    },
  },
  computed: {
    filterdByUsers() {
      return this.$store.getters.filterdByUsers;
    },
    searchedUsers() {
      return this.$$store.getters.searchedUsers;
    },
  },
};
</script>

<style>
</style>