<template>
  <section class="post-list-profile">
    <li v-for="(post, index) in posts" :key="post._id" class="post-grid">
      <img
        :src="post.imgsUrl[0]"
        @click="onClickedPost(index)"
        class="post-img"
      />
      <section v-if="isClickedPost && postIndex === index">
        <UserPostPreview
          :post="post"
          :user="user"
          :postsLength="posts.length"
          :postIndex="index"
          @onClosePost="onClosePost"
          @onChangePostIndex="onChangePostIndex"
        />
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
    user: {
      type: Object,
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
    onChangePostIndex(direction) {
      this.postIndex += direction;
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