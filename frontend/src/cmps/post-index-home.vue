<template>
  <section>
    <PostListHome :posts="posts" />
    <div v-if="isLoadingPosts" class="loader-container-post-index">
      <Loader v-if="isLoadingPosts" />
    </div>
  </section>
</template>

<script>
import PostListHome from "./post-list-home.vue";
import Loader from "../components/loader.vue";
import { Fragment } from "vue";
export default {
  components: { PostListHome, Loader, Fragment },
  data() {
    return {
      maxPageScroll: null,
      currNumOfPostsToQuerry: 4,
      isLoadingPosts: false,
    };
  },
  async created() {
    window.addEventListener("scroll", this.onWindowScroll);
    await this.$store.dispatch({ type: "loadPosts", userId: this.$store.getters.GetUser._id, numOfPostsToQuerry: this.currNumOfPostsToQuerry})
  },
  computed: {
    posts() {
      return this.$store.getters.followingPosts
    },
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  },
  methods: {
    onWindowScroll() {
      let maxScroll = document.body.scrollHeight - window.innerHeight;
      let scrollPosition = window.scrollY;
      const targetHeight = maxScroll * 0.7; // 70% of window height

      if (scrollPosition >= targetHeight) {
        this.isLoadingPosts = true;
        this.currNumOfPostsToQuerry += 4;
        this.$store.dispatch({ type: "loadPosts", userId: this.$store.getters.GetUser._id, numOfPostsToQuerry: this.currNumOfPostsToQuerry})
      }
      // This timeout is desgneited to remove listener if there are no new posts
      if (scrollPosition === maxScroll || scrollPosition > maxScroll * 0.95) {
        setTimeout(() => {
          maxScroll = document.body.scrollHeight - window.innerHeight
          scrollPosition = window.scrollY
          if (scrollPosition === maxScroll || scrollPosition > maxScroll * 0.95) {
            this.isLoadingPosts = false
            window.removeEventListener("scroll", this.onWindowScroll)
          }
        }, 300);
      }

    },
  },
  watch: {
  "$store.getters.followingPosts": {
    deep: true,
    async handler(newValue) {
      this.isLoadingPosts = false
    },
  },
},
};
</script>
<style scoped>
.loader-container-post-index {
  position: relative;
  bottom: 75vh;
  /* transform: translate(-50%, -50%);  */
}
</style>



