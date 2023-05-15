<template>
  <article v-if="!isOwnByUser" class="post-home-settings">
    <section class="bg-container" @click="onClose"></section>
    <section v-if="!isOnUnfollow" class="post-home-settings-modal">
      <button style="color: red; font-weight: bold">Report</button>
      <button @click="onMoveToUnfollow" style="color: red; font-weight: bold">
        Unfollow
      </button>
      <button>Add to favorites</button>
      <button>Go to post</button>
      <button>Go to post</button>
      <button>Share to...</button>
      <button>Copy link</button>
      <button>Go to post</button>
      <button @click="onClose">Cancel</button>
    </section>
    <UnfollowModal
      v-if="isOnUnfollow"
      @onClose="onClose"
      :userId="post.userId"
    />
  </article>
</template>

<script>
import { postService } from "../services/post.service";
import UnfollowModal from "./unfollow-modal.vue";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOnUnfollow: false,
    };
  },
  created() {
    console.log(this.post);
  },
  methods: {
    onClose() {
      this.$emit("toggleSettings");
    },
    onMoveToUnfollow() {
      this.isOnUnfollow = !this.isOnUnfollow;
    },
  },
  computed: {
    isOwnByUser() {
      return postService.isPostOwendByUser(this.post.userId);
    },
  },
  components: {
    UnfollowModal,
  },
};
</script>

<style>
</style>