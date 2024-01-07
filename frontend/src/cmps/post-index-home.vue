<template>
  <section>
  <PostListHome :posts="posts" />
  <div v-if="isLoadingPosts" class="loader-container-post-index">
  <Loader v-if="isLoadingPosts"/>
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
      isLoding: false,
      maxPageScroll: null,
      currNumOfPostsToQuerry: 4,
      isLoadingPosts: false,
    };
  },
  async created() {
    window.addEventListener("scroll", this.onWindowScroll);
    console.log('document.body.scrollHeight', document.body.scrollHeight, 'window.innerHeight',window.innerHeight)
    this.maxPageScroll = document.body.scrollHeight - window.innerHeight;
    await this.$store.dispatch({
      type: "loadPosts",
      userId: this.$store.getters.GetUser._id,
      numOfPostsToQuerry: this.currNumOfPostsToQuerry,
    });

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
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const targetHeight = maxScroll * 0.7; // 70% of window height
      console.log('Max - scroll:', maxScroll)
      console.log('Max - scroll(at start):', this.maxPageScroll)
      if (maxScroll > this.maxPageScroll) this.isLoadingPosts = false
      else {
        setTimeout(window.removeEventListener("scroll", this.onWindowScroll), 1500)
        return
      }
      if (scrollPosition >= targetHeight && !this.isLoadingPosts) {
        console.log('hi')
        this.isLoadingPosts = true;
        this.currNumOfPostsToQuerry += 4;
        this.$store.dispatch({
          type: "loadPosts",
          userId: this.$store.getters.GetUser._id,
          numOfPostsToQuerry: this.currNumOfPostsToQuerry,
        });
        this.maxPageScroll = maxScroll;
      }

    },
  },
  watch: {
      "$store.getters.followingPosts": {
        deep: true,
        async handler(newValue) {
          console.log("newValue", newValue.length, this.posts.length)
           if (newValue.length === this.posts.length) this.isLoadingPosts = false 
          //  if (this.isLoadingPosts) this.isLoadingPosts = false

        },
      },
    },
};
</script>
<style scoped>
  .loader-container-post-index { 
      position: relative;
      bottom: 75vh;
      left: 10vw;
    /* transform: translate(-50%, -50%);  */
  }
</style>