<template>
  <div>
  <div class="no-resent" v-if="!searchedUsers.length && !filterdByUsers.length">
      No recent searches.
    </div>
  <section class="users-list">
    <li v-for="(user, index) in filterdByUsers" :key="index">
      <div class="list-container" @click="moveTo(user)">
        <img class="user-img" :src="user.imgUrl" alt="" />
        <div class="user-info">
          <span>{{ user.username }}</span>
          <span>{{ user.fullname }}</span>
        </div>
      </div>
    </li>
    <div class="resent-action" v-if="!filterdByUsers.length">
      <h3 v-if="searchedUsers.length">Resent</h3>
      <button
        v-if="searchedUsers.length"
        class="clear-all-btn"
        @click="onClearAll()"
      >
        Clear all
      </button>
    </div>
    <div v-if="searchedUsers.length && !filterdByUsers.length">
      <li v-for="(user, index) in searchedUsers" :key="index">
        <div class="list-container" @click="moveTo(user)">
          <img class="user-img" :src="user.imgUrl" alt="" />
          <div class="user-info">
            <span>{{ user.username }}</span>
            <span>{{ user.fullname }}</span>
          </div>
        </div>
        <button class="remove-one-btn" @click="onRemoveOneResent(user.userId)">
          <v-icon name="bi-x" scale="1.8" />
        </button>
      </li>
    </div>
  </section>
</div>
</template>

<script>
export default {
  methods: {
    async moveTo(user) {
      await this.$store.dispatch({type: 'toggleLoader'})
      this.$store.dispatch({ type: "addSearchedUser", user})
      if (window.innerWidth < 770) this.$emit("onCloseMobileSearch");
      else this.$emit("onToggleWindow");
      this.$router.push(`/profile/${user._id}`);
      setTimeout(() => this.$store.dispatch({type: 'toggleLoader'}), 1000)
    },
    onRemoveOneResent(userId) {
      this.$store.dispatch({
        type: "removeOneSearchedUser",
        userId,
      });
    },
    onClearAll() {
      this.$store.dispatch({
        type: "removeAllSearchedUsers",
      });
    },
  },
  computed: {
    filterdByUsers() {
      return this.$store.getters.filterdByUsers;
    },
    searchedUsers() {
      return this.$store.getters.searchedUsers;
    },
  },
};
</script>

<style>
</style>