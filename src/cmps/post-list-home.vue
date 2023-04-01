<template>
  <section>
    <section class="post-preview-home" v-for="(post, index) in posts" :key="post.id">
      <post-preview-home :post="post" @onOpenPostModal="onOpenPostModal(index)" />
      <PostModal
        v-if="this.$store.getters.isPostModalOpen && postIndex === index"
        :post="post"
          :user="this.$store.getters.GetUser"
          :isAtHomePage="true"
        />
    </section>
  </section>
  
</template>

<script>
import { postService } from "../services/post.service";
import postPreviewHome from "./post-preview-home.vue";
import PostModal from "../pages/post-modal.vue";
export default {
  components: { postPreviewHome,  PostModal},
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
  },

  methods: {
    timeAgo(timestamp) {
      return postService.getTime(timestamp);
    },
    onOpenPostModal(index) {
      this.$store.dispatch({
            type: 'togglePostModal',
            isOpen: true
        })
        this.postIndex = index;
    },
    async onLike() {
      try {
        let userInfo = {
          imgUrl: this.loggedInUser.imgUrl,
          userId: this.loggedInUser._id,
          username: this.loggedInUser.username,
        };
        await postService.addLike(this.post._id, userInfo);
        this.$store.dispatch({
          type: "loadPosts",
          userId: this.$route.params._id,
        });
      } catch (err) {
        console.error("coudl'nt like this post", err);
      }
    },
    didUserLikedPost(post) {
      return postService.didUserLikedPost(post);
    },
  },
  
  computed: {
    loggedInUser() {
      return this.$store.getters.GetUser;
    },

    index() {
      
    }
    
  }
};
</script>
