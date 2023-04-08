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
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.pageYOffset;
      const windowSize = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      console.log(
        "scrollPosition",
        scrollPosition,
        "windowSize",
        windowSize,
        "documentHeight",
        documentHeight
      );

      if (scrollPosition > (documentHeight - windowSize) / 2) {
        this.loadMoreContent();
      }
    },
    loadMoreContent() {
      console.log("load");
    },
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
