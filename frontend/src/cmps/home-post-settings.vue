<template>
  <article v-if="!isOwnByUser" class="post-home-settings">
    <section class="bg-container" @click="onClose"></section>
    <section
      v-if="!isOnUnfollow && !isOnReport"
      class="post-home-settings-modal"
    >
      <button @click="onMoveToReport" style="color: red; font-weight: bold">
        Report
      </button>
      <button @click="onMoveToUnfollow" style="color: red; font-weight: bold">
        Unfollow
      </button>
      <button>Add to favorites</button>
      <button>Go to post</button>
      <button>Share to...</button>
      <button>Copy link</button>
      <button>About this account</button>
      <button @click="onClose">Cancel</button>
    </section>

    <ReportModal
      v-if="isOnReport"
      @onClose="onClose"
      :username="post.username"
      :userId="post.userId"
    />

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
import ReportModal from "./report-modal.vue";

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
      isOnReport: false,
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
    onMoveToReport() {
      this.isOnReport = !this.isOnReport;
    },
  },
  computed: {
    isOwnByUser() {
      return postService.isPostOwendByUser(this.post.userId);
    },
  },
  components: {
    UnfollowModal,
    ReportModal,
  },
};
</script>

<style>
</style>