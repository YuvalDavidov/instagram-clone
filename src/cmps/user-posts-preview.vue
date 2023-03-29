<template>
  <section class="user-post-preview">
    <section class="container" @click="closePost"></section>
    <section class="post-actions-btns">
      <button v-if="postIndex" @click="onChangePostIndex(-1)" class="left">
        <v-icon name="md-keyboardarrowleft-round" scale="2" />
      </button>
      <button v-if="!isLastPost" @click="onChangePostIndex(1)" class="right">
        <v-icon name="md-keyboardarrowright-round" scale="2" />
      </button>
    </section>
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
          <button>
            <v-icon name="bi-three-dots" />
          </button>
        </div>
        <div class="comments">
          <li class="post-summery" v-if="haveSummery">
            <img :src="user.imgUrl" class="summery-img" />
            <section class="summery-info">
              <h5>{{ user.username }}</h5>
              <span>{{ post.summery }}</span>
            </section>
          </li>
          <ul class="post-comment-ul" v-if="post.comments.length">
            <li
              class="post-comment"
              v-for="comment in post.comments"
              :key="comment.id"
            >
              <section class="comment-info-container">
                <img :src="comment.userImgUrl" class="comment-img" />
                <section class="comment-info">
                  <span class="comment-txt">
                    <span>{{ comment.username }}</span> {{ comment.txt }}</span
                  >
                </section>
                <article class="comment-like-n-comments">
                  <span>{{ uploadedCommentTime(comment.timeStamp) }}</span>
                  <span>0 likes</span>
                  <span>Replay</span>
                </article>
              </section>
              <button>
                <v-icon name="bi-heart" />
              </button>
            </li>
          </ul>
          <div class="no-comments" v-if="!post.comments.length">
            <span> no comments yet. </span>
            <small>start the conversations.</small>
          </div>
        </div>
        <section class="add-comment">
          <div class="actions-btns">
            <section>
              <button>
                <v-icon
                  scale="1.2"
                  name="bi-heart"
                  @click="addLike()"
                  v-if="!didUserLikedPost"
                />
                <v-icon
                  scale="1.2"
                  fill="red"
                  name="bi-heart-fill"
                  @click="removeLike()"
                  v-if="didUserLikedPost"
                />
              </button>
              <button @click="focusOnInput()">
                <v-icon scale="1.2" name="bi-chat" />
              </button>
              <button>
                <v-icon scale="1.2" name="bi-send" />
              </button>
            </section>
            <button><v-icon scale="1.2" name="la-bookmark-solid" /></button>
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
    <UserPostSettings v-if="isSettingesOpen" />
  </section>
</template>

<script>
import { postService } from "../services/post.service";
import ImgSlider from "./img-slider.vue";
import UserPostSettings from "./user-post-settings.vue";

export default {
  data() {
    return {
      commentTxt: "",
      isSettingesOpen: false,
    };
  },
  components: { ImgSlider, UserPostSettings },
  props: {
    post: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    postsLength: {
      type: Number,
      required: true,
    },
    postIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    closePost() {
      this.$emit("onClosePost");
    },
    onChangePostIndex(direction) {
      this.$emit("onChangePostIndex", direction);
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
        this.commentTxt = "";
      } catch (error) {
        new Error("coudl'nt add the comment to this post", error);
      }
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
    uploadedCommentTime(commentTimeStemp) {
      return postService.getCommentTime(commentTimeStemp);
    },
    didUserLikedComment() {},
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.GetUser;
    },
    uploadedTime() {
      return postService.getTime(this.post.timeStamp);
    },
    didUserLikedPost() {
      return postService.didUserLikedPost(this.post);
    },
    canComment() {
      if (this.commentTxt.length >= 1) return true;
      else false;
    },
    haveSummery() {
      if (this.post.summery.length >= 1) return true;
      else false;
    },
    isLastPost() {
      if (this.postIndex === this.postsLength - 1) return true;
      else false;
    },
  },
};
</script>
