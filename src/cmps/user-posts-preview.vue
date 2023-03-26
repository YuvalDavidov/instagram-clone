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
            <a
              @click="addComment()"
              :class="{ active: commentTxt.length >= 1 }"
            >
              post
            </a>
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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
    addComment() {
      if (this.commentTxt.length < 1) return;
    },
    async addLike() {
      try {
        let userLiked = userService.getLoggedinUser();
        let userInfo = {
          imgUrl: userLiked.imgUrl,
          userId: userLiked._id,
          username: userLiked.username,
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
        const userId = userService.getLoggedinUser()._id;
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
    uploadedTime() {
      let now = new Date().getTime();
      let postTime = new Date(this.post.timeStamp).getTime();
      let diff = (now - postTime) / 1000;
      diff /= 60 * 60;
      let houserDiff = Math.abs(Math.round(diff));
      if (houserDiff >= 24 && houserDiff <= 168)
        return Math.round(houserDiff / 24) + " DAYS AGO";
      else if (houserDiff >= 168) {
        return (
          new Date(this.post.timeStamp).getDate() +
          " " +
          months[new Date(this.post.timeStamp).getMonth()]
        );
      } else return houserDiff + " HOURS AGO";
    },
    didUserLiked() {
      let user = userService.getLoggedinUser();
      let didUserLiked = this.post.likes.find(
        (like) => like.userId === user._id
      );
      if (didUserLiked) return true;
      else return false;
    },
  },
};
</script>

<style>
</style>