<template>
  <section class="post-page">
    <PostModal v-if="post" :post="post" :isAtPostPage="true" />
  </section>
</template>

<script>
import PostModal from "./post-modal.vue";

export default {
  data() {
    return {
      post: null,
    };
  },
  async created() {
    await this.$store.dispatch({
      type: "loadPost",
      postId: this.$route.params.postId,
    });
    this.post = this.$store.getters.getPost;
  },
  components: {
    PostModal,
  },
  watch: {
    "$store.getters.getPost": {
      deep: true,
      async handler(newValue) {
        console.log("newValue", newValue);
        this.post = newValue;
      },
    },
  },
};
</script>

<style>
</style>