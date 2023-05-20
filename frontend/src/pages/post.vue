<template>
  <section class="post-page">
    <PostModal v-if="post" :post="post" :isAtPostPage="true" />

    <hr />

    <section class="more-user-posts">
      <span>More user posts</span>

      <section class="post-list-profile">
        <li
          v-for="(post, index) in moreUserPosts"
          :key="post._id"
          class="post-grid"
        >
          <img
            :src="post.imgsUrl[0]"
            @click="onClickedPost(index)"
            class="post-img"
          />
        </li>
      </section>
    </section>
  </section>
</template>

<script>
import PostModal from "./post-modal.vue";

export default {
  data() {
    return {
      post: null,
      moreUserPosts: [],
    };
  },
  async created() {
    await this.$store.dispatch({
      type: "loadPost",
      postId: this.$route.params.postId,
    });
    this.post = this.$store.getters.getPost;
    // get more user posts
    await this.$store.dispatch({
      type: "loadUserPosts",
      userId: this.post.userId,
    });

    this.moreUserPosts = this.$store.getters.userPosts;
    this.moreUserPosts = this.moreUserPosts.filter(
      (p) => p._id !== this.post._id
    );
  },
  components: {
    PostModal,
  },
  methods: {
    onClickedPost(idx) {
      // console.log(idx);
      this.$router.push(`/post/${this.moreUserPosts[idx]._id}`);
    },
  },
  watch: {
    "$store.getters.getPost": {
      deep: true,
      async handler(newValue) {
        console.log("newValue", newValue);
        this.post = newValue;
      },
    },
    "$route.params": {
      immediate: true,
      async handler(params) {
        // Fetch data for the new route
        await this.$store.dispatch({
          type: "loadPost",
          postId: this.$route.params.postId,
        });
        this.post = this.$store.getters.getPost;
        // get more user posts
        await this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.post.userId,
        });

        this.moreUserPosts = this.$store.getters.userPosts;
        this.moreUserPosts = this.moreUserPosts.filter(
          (p) => p._id !== this.post._id
        );
      },
    },
  },
};
</script>

<style>
</style>