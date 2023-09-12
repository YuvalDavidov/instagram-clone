<template>
  <section
    class="side-bar-side-window"
    :class="{ isClosing: isClosingProp }"
    v-if="isSidebarWindowOpen"
  >
    <section class="top">
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
    </section>
    <UsersList @onToggleSearch="onToggleWindow" />
  </section>
</template>

<script>
import UsersList from "@/cmps/users-list.vue";

export default {
  data() {
    return {
      searchTxt: "",
      timeoutId: false,
    };
  },
  props: {
    contant: {},
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
  },
  components: {
    UsersList,
  },
};
</script>

<style>
</style>