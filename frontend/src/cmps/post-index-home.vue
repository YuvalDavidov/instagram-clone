<template>
  <post-list-home :posts="posts" />
</template>

<script>
import postListHome from "./post-list-home.vue";
export default {
  components: { postListHome },
  data() {
    return {
      maxPageScroll: null,
      currNumOfPostsToQuerry: 4,
      isLoadingPosts: false,
    };
  },
  created() {
    if (this.$store.getters.followingPosts.length) return
    this.$store.dispatch({
      type: "loadPosts",
      userId: this.$store.getters.GetUser._id,
      numOfPostsToQuerry: this.currNumOfPostsToQuerry,
    });
    window.addEventListener("scroll", this.onWindowScroll);
    this.maxPageScroll = document.body.scrollHeight - window.innerHeight;
  },

  computed: {
    posts() {
      return this.$store.getters.followingPosts
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.onWindowScroll);
  },
  methods: {
    onWindowScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const targetHeight = maxScroll * 0.7; // 70% of window height

      if (maxScroll > this.maxPageScroll) this.isLoadingPosts = false;

      if (scrollPosition >= targetHeight && !this.isLoadingPosts) {
        this.currNumOfPostsToQuerry += 4;
        this.$store.dispatch({
          type: "loadPosts",
          userId: this.$store.getters.GetUser._id,
          numOfPostsToQuerry: this.currNumOfPostsToQuerry,
        });
        this.isLoadingPosts = true;
        this.maxPageScroll = maxScroll;
      }
    },
    watch: {
      "$store.getters.followingPosts": {
        deep: true,
        async handler(newValue) {
          console.log("newValue", newValue);
        },
      },
    },
  },
};
</script>
