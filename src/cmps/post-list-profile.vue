<template>
  <section class="post-list-profile">
    <li v-for="(post, index) in posts" :key="post._id" class="post-grid">
      <img :src="post.imgsUrl[0]" @click="onClickedPost(index)" />
      <section v-if="isClickedPost && postIndex === index">
        <UserPostPreview :post="post" @onClosePost="onClosePost" />
      </section>
    </li>
  </section>
</template>

<script>
import UserPostPreview from "./user-posts-preview.vue";
export default {
  data() {
    return {
      isClickedPost: false,
      postIndex: null,
    };
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onClickedPost(idx) {
      this.isClickedPost = !this.isClickedPost;
      this.postIndex = idx;
    },
    onClosePost() {
      this.isClickedPost = !this.isClickedPost;
      this.postIndex = null;
    },
  },
  computed: {},
  components: {
    UserPostPreview,
  },
};
</script>

<style>
</style>