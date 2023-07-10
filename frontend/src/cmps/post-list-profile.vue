<template>
  <section class="post-list-profile">
    <li v-for="(post, index) in posts" :key="post._id" class="post-grid">
      <img
        :src="post.imgsUrl[0]"
        @click="onClickedPost(index)"
        class="post-img"
      />

      <PostModal
        v-if="isModalOpen && postIndex === index"
        :post="post"
        :isAtHomePage="false"
        :postsLength="posts.length"
        :postIndex="index"
        :isOwnProfile="isOwnProfile"
        @onChangePostIndex="onChangePostIndex"
        @onCloseModal="onCloseModal"
      />
    </li>
  </section>
</template>

<script>
import PostModal from "../pages/post-modal.vue";
import { postService } from "../services/post.service";
export default {
  data() {
    return {
      postIndex: null,
      isModalOpen: false,
      // profilePost: [],
    };
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },

    isOwnProfile: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClickedPost(idx) {
      this.isModalOpen = !this.isModalOpen;
      this.postIndex = idx;
    },
    onCloseModal() {
      this.isModalOpen = !this.isModalOpen;
      this.postIndex = null;
    },
    onChangePostIndex(direction) {
      this.postIndex += direction;
    },
  },
  
  components: {
    PostModal,
  },
};
</script>

<style>
</style>