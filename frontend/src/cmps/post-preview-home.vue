<template>
  <article v-if="loggedInUser" class="post-details-home">
    <div class="post-details-header">
      <img class="user-img" :src="post.userImg" />
      <span>{{ post.username }}</span>
      <button @click="onToggleSettings">
        <v-icon name="bi-three-dots" />
      </button>
    </div>
    <ImgSlider class="post-img" :imgsUrl="post.imgsUrl" />
    <div class="post-actions">
      <nav class="actions-nav">
        <button class="action-icon">
          <v-icon
            scale="1.2"
            name="bi-heart"
            @click="addLike()"
            v-if="!didUserLikedPost()"
          />
          <v-icon
            scale="1.2"
            fill="red"
            name="bi-heart-fill"
            @click="removeLike()"
            v-if="didUserLikedPost()"
          />
        </button>
        <button class="action-icon comment" @click="onOpenPostModal">
          <v-icon scale="1.2" name="bi-chat" flip="horizontal" />
        </button>
      </nav>
      <span>{{ post.likes.length }} likes</span>
      <div>
        <div
          :style="
            isFullSummeryShown
              ? 'white-space: pre-wrap;'
              : 'white-space: nowrap;'
          "
          class="post-summery"
        >
          <span class="username">{{ post.username }}</span>
          <span class="space"></span>
          <span class="summery">{{ post.summery }}</span>
        </div>
        <button
          v-if="!isFullSummeryShown && post.summery.length > 40"
          class="show-summery-btn"
          @click="showSummery()"
        >
          more
        </button>
      </div>
      <button @click="onOpenPostModal()" v-if="post.comments.length">
        View all {{ post.comments.length }} comments
      </button>
      <span class="time-span">{{ timeAgo(post.createdAt) }} </span>
      <section class="input-actions">
        <input
          ref="comment"
          v-model="commentTxt"
          type="text"
          class="comment-input"
          placeholder="Add a comment..."
        />
        <a @click="addComment()" :class="{ active: canComment }"> post </a>
      </section>
    </div>
    <PostSettings
      @onToggleSettings="onToggleSettings"
      v-if="isSettingsOpen"
      :post="post"
    />
  </article>
</template>

<script>
import { postService } from "../services/post.service";
import ImgSlider from "./img-slider.vue";
import PostSettings from "./post-settings.vue";

export default {
  data() {
    return {
      commentTxt: "",
      isFullSummeryShown: false,
      isSettingsOpen: false,
      loggedInUser: undefined
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  async created() {
    this.loggedInUser = await this.$store.getters.GetUser
  },
  methods: {
    timeAgo(timestamp) {
      return postService.getTime(timestamp);
    },
    didUserLikedPost() {
      return postService.didUserLikedPost([...this.post.likes], this.loggedInUser._id);
    },
    showSummery() {
      this.isFullSummeryShown = true;
    },
    async addComment() {
      if (this.commentTxt.length < 1) return;

      try {
        const commentInfo = {
          txt: this.commentTxt,
          userid: this.loggedInUser._id,
          username: this.loggedInUser.username,
          userImgUrl: this.loggedInUser.imgUrl,
        };
        const updatedPost = await postService.addComment(this.post, commentInfo);
        this.$store.dispatch({
          type: "savePost",
          post: updatedPost,
        });
      } catch (error) {
        new Error("coudl'nt add the comment to this post", error);
      }
      this.commentTxt = "";
    },
    onOpenPostModal() {
      this.$emit("onOpenPostModal");
    },
    async removeLike() {
      try {
        const userId = this.loggedInUser._id;
        const updatedPost = await postService.removeLike(this.post, userId);
        this.$store.dispatch({
          type: "savePost",
          post: updatedPost,
        });
      } catch (err) {
        throw new Error("coudl'nt remove like from this post", err);
      }
    },
    async addLike() {
      try {
       const updatedPost =  await postService.addLike(this.post, this.loggedInUser._id);
       console.log(updatedPost)
        await this.$store.dispatch({
          type: "savePost",
          post: updatedPost,
        });
      } catch (err) {
        console.error("coudl'nt like this post", err);
      }
    },
    
    onToggleSettings() {
      
      this.isSettingsOpen = !this.isSettingsOpen;
    },
  },
  computed: {
    canComment() {
      if (this.commentTxt.length >= 1) return true;
      else false;
    },
 
  },
  components: {
    ImgSlider,
    PostSettings,
  },
};
</script>

<style>
</style>