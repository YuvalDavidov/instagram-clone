<template>
  <section class="post-list-profile">
    <li v-for="(post, index) in profilePost" :key="post._id" class="post-grid">
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
        @onCloseModale="onCloseModale"
      />
    </li>
  </section>
</template>

<script>
import PostModal from "../pages/post-modal.vue";
export default {
  data() {
    return {
      postIndex: null,
      isModalOpen: false,
      profilePost: [],
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
  mounted() {
    this.profilePost = this.posts.map((post) => {
      return {
        ...post,
        timeStamp: new Date(post.timeStamp).getTime(),
      };
    });
    this.profilePost = this.profilePost.sort(
      (a, b) => b.timeStamp - a.timeStamp
    );
  },
  methods: {
    onClickedPost(idx) {
      this.isModalOpen = !this.isModalOpen;
      this.postIndex = idx;
    },
    onCloseModale() {
      this.isModalOpen = !this.isModalOpen;
      this.postIndex = null;
    },
    onChangePostIndex(direction) {
      this.postIndex += direction;
    },
  },
  computed: {},
  components: {
    PostModal,
  },
};
</script>

<style>
</style>