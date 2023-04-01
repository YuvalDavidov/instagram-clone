<template>
  <section class="post-list-profile">
    <li v-for="(post, index) in posts" :key="post._id" class="post-grid">
      <img
        :src="post.imgsUrl[0]"
        @click="onClickedPost(index)"
        class="post-img"
      />
    
        <PostModal
        v-if="this.$store.getters.isPostModalOpen && postIndex === index"
          :post="post"
          :isAtHomePage="false"
          :postsLength="posts.length"
          :postIndex="index"
          :isOwnProfile="isOwnProfile"
          @onChangePostIndex="onChangePostIndex"
        />
     
    </li>
  </section>
</template>

<script>
import PostModal from '../pages/post-modal.vue'
export default {
  data() {
    return {
      postIndex: null,
    };
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
   
    isOwnProfile: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClickedPost(idx) {
      this.$store.dispatch({
            type: 'togglePostModal',
            isOpen: true
        })
      this.postIndex = idx;
    },
    onChangePostIndex(direction) {
      this.postIndex += direction;
    },
  },
  computed: {},
  components: {
    PostModal
  },
};
</script>

<style>
</style>