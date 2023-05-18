<template>
  <section class="post-settings">
    <section class="bg-container" @click="onClose"></section>

    <UserPostSettings
      v-if="isOwnByUser"
      :post="post"
      :isAtPostPage="isAtPostPage"
      @onToggleSettings="onClose"
      @closePost="closePost"
      @toggleLikes="toggleLikes"
      @toggleCommenting="toggleCommenting"
      @onToggleCreate="onToggleCreate"
      @onMoveToPost="onMoveToPost"
    />
    <article v-if="!isOwnByUser" class="post-settings-following-user">
      <section
        v-if="!isOnUnfollow && !isOnReport"
        class="post-home-settings-modal"
        v-bind:class="{ isAtPostPage }"
      >
        <button @click="onMoveToReport" style="color: red; font-weight: bold">
          Report
        </button>
        <button @click="onMoveToUnfollow" style="color: red; font-weight: bold">
          Unfollow
        </button>
        <button>Add to favorites</button>
        <button @click="onMoveToPost" v-if="!isAtPostPage">Go to post</button>
        <button>Share to...</button>
        <button>Copy link</button>
        <button @click="onMoveToAboutUser">About this account</button>
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

      <!-- <AboutUserModal v-if="isOnAbout" /> -->
    </article>
  </section>
</template>

<script>
import { postService } from "../services/post.service";
import UnfollowModal from "./unfollow-modal.vue";
import UserPostSettings from "../cmps/user-post-settings.vue";
import ReportModal from "./report-modal.vue";
import AboutUserModal from "./about-user-modal.vue";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    isAtPostPage: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isOnUnfollow: false,
      isOnReport: false,
      isOnAbout: false,
    };
  },
  created() {
    console.log(this.post);
  },
  methods: {
    onClose() {
      this.$emit("onToggleSettings");
    },
    onMoveToUnfollow() {
      this.isOnUnfollow = !this.isOnUnfollow;
    },
    onMoveToReport() {
      this.isOnReport = !this.isOnReport;
    },
    onMoveToPost() {
      this.$router.push(`/post/${this.post._id}`);
    },
    onMoveToAboutUser() {
      this.isOnAbout = !this.isOnAbout;
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
    UserPostSettings,
    AboutUserModal,
  },
};
</script>

<style>
</style>