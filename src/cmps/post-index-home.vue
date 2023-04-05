<template>
  <post-list-home :posts="posts" />
</template>

<script>
import postListHome from "./post-list-home.vue";
export default {
  components: { postListHome },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({
      type: "loadPosts",
      user: this.$store.getters.GetUser,
    });
  },
  computed: {
    posts() {
      return this.$store.getters.followingPosts;
    },
  },
  watch: {
    "$store.getters.followingPosts": {
      deep: true,
      async handler(newValue) {
        console.log("newValue", newValue);
      },
    },
  },
};
</script>
