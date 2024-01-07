<template>
  <section class="posts-container">
    <section 
      class="post-preview-home"
      v-for="(post, index) in posts"
      :key="post._id"
    >
      <PostPreviewHome
        :post="post"
        @onOpenPostModal="onOpenPostModal(index)"
      />
      <PostModal
        v-if="isModalOpen && postIndex === index"
        :post="post"
        :user="this.$store.getters.GetUser"
        :isAtHomePage="true"
        @onCloseModal="onCloseModal"
      />
    </section>
  </section>
</template>

<script>
import PostPreviewHome from "./post-preview-home.vue";
import PostModal from "../pages/post-modal.vue";
export default {
  components: { PostPreviewHome, PostModal },
  data() {
    return {
      postIndex: null,
      isModalOpen: false,
    };
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {

    onOpenPostModal(index) {
      this.isModalOpen = !this.isModalOpen;
      this.postIndex = index;
    },
    onCloseModal() {
      this.isModalOpen = !this.isModalOpen;
      this.postIndex = null;
    },
   
  },
};
</script>
