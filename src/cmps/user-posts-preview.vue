<template>
  <section class="user-post-preview">
    <section class="container" @click="closePost"></section>
    <section class="post">
      <section class="post-images">
        <ImgSlider :imgsUrl="post.imgsUrl" />
      </section>
      <section class="summery-n-comments">
        <div class="summery-top">
          <header>
            <img :src="user.imgUrl" class="user-img" />
            <span>{{ user.username }}</span>
          </header>
          <button>...</button>
        </div>
        <div class="comments"></div>
        <section class="add-comment">
          <div class="actions-btns">
            <section>
              <button>
                <v-icon
                  name="bi-heart"
                  @click="addLike()"
                  v-if="!didUserLiked"
                />
                <v-icon
                  name="fc-like"
                  @click="removeLike()"
                  v-if="didUserLiked"
                />
              </button>
              <button @click="focusOnInput()">
                <v-icon name="bi-chat" />
              </button>
              <button>
                <v-icon name="bi-send" />
              </button>
            </section>
            <button>save</button>
          </div>
          <span> {{ post.likes.length }} likes</span>
          <small> {{ uploadedTime }}</small>

          <section class="input-actions">
            <input
              ref="comment"
              v-model="commentTxt"
              type="text"
              class="comment-input"
              placeholder="comment..."
            />
            <a @click="addComment()" :class="{ active: canComment }"> post </a>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { postService } from "../services/post.service";
import { userService } from "../services/user.service";
import ImgSlider from "./img-slider.vue";

export default {
  data() {
    return {
      commentTxt: "",
    };
  },
  components: { ImgSlider },
  props: {
    post: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePost() {
      this.$emit("onClosePost");
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
        await postService.addComment(this.post._id, commentInfo);
        this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.$route.params._id,
        });
      } catch (error) {}
    },
    async addLike() {
      try {
        let userInfo = {
          imgUrl: this.loggedInUser.imgUrl,
          userId: this.loggedInUser._id,
          username: this.loggedInUser.username,
        };
        await postService.addLike(this.post._id, userInfo);
        this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.$route.params._id,
        });
      } catch (err) {
        throw new Error("coudl'nt like this post", err);
      }
    },
    async removeLike() {
      try {
        const userId = this.loggedInUser._id;
        await postService.removeLike(this.post._id, userId);
        this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.$route.params._id,
        });
      } catch (err) {
        throw new Error("coudl'nt remove like from this post", err);
      }
    },
    focusOnInput() {
      this.$refs.comment.focus();
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.GetUser;
    },
    uploadedTime() {
      return postService.getTime(this.post.timeStamp);
    },
    didUserLiked() {
      return postService.didUserLiked(this.post);
    },
    canComment() {
      if (this.commentTxt.length >= 1) return true;
      else false;
    },
  },
};
</script>

<style>
</style>