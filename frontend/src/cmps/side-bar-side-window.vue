<template>
  <section
    class="side-bar-side-window"
    :class="{ isClosing: isClosingProp }"
    v-if="isSidebarWindowOpen"
  >
    <section v-if="contant === 'search'" class="side-bar-side-window-search">
      <article class="top">
        <h1>Search</h1>
        <input
          @input="onSearch"
          class="search-input"
          type="text"
          placeholder="Search"
          v-model="this.searchTxt"
        />
        <button
          v-if="this.searchTxt.length"
          @click="onClearSearch()"
          class="clear-search-input-btn"
        >
          x
        </button>
      </article>
      <UsersList @onToggleSearch="onToggleWindow" />
    </section>

    <section
      v-if="contant === 'notic'"
      class="side-bar-side-window-notifications"
    >
      <h1>Notifications</h1>
      <NotificationsList @onToggleNoticList="onToggleNoticList" />
    </section>
  </section>
</template>

<script>
import UsersList from "@/cmps/users-list.vue";
import NotificationsList from "@/cmps/notifications-list.vue";

export default {
  data() {
    return {
      searchTxt: "",
      timeoutId: false,
    };
  },
  created() {
    // console.log("side", this.contant);
  },
  props: {
    contant: {
      type: String,
      required: true,
    },
    isClosingProp: {
      type: Boolean,
      required: true,
    },
    isSidebarWindowOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onSearch() {
      this.$store.dispatch({
        type: "loadUsersBy",
        filterBy: this.searchTxt,
      });
    },
    onClearSearch() {
      this.searchTxt = "";
      this.onSearch();
    },
    onToggleWindow() {
      this.$emit("onToggleSidebarWindow");
    },
    onToggleNoticList(list) {
      this.$emit("onToggleNoticList", list);
    },
  },
  components: {
    UsersList,
    NotificationsList,
  },
};
</script>

<style>
</style>