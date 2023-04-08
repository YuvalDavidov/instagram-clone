<template>
  <section class="post-modal">
    <section class="container" @click="closePost"></section>
    <section class="post-actions-btns" v-if="!isAtHomePage">
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
            <img :src="post.userImg" class="user-img" />
            <span>{{ post.username }}</span>
          </header>
          <button @click="onToggleSettings" v-if="isOwnProfile">
            <v-icon name="bi-three-dots" />
          </button>
        </div>
        <div class="comments">
          <li class="post-summery" v-if="haveSummery">
            <img :src="post.userImg" class="summery-img" />
            <section class="summery-info">
              <h5>{{ post.username }}</h5>
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
                <v-icon scale="1.2" name="bi-chat" flip="horizontal" />
              </button>
              <button>
                <v-icon scale="1.2" name="bi-send" />
              </button>
            </section>
            <button><v-icon scale="1.2" name="la-bookmark-solid" /></button>
          </div>
          <span v-if="post.isLikeCountVisible">
            {{ post.likes.length }} likes</span
          >
          <small> {{ uploadedTime }}</small>

          <section v-if="post.isCommentingAllowed" class="input-actions">
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
    <UserPostSettings
      :post="post"
      @onToggleSettings="onToggleSettings"
      @closePost="closePost"
      @toggleLikes="toggleLikes"
      @toggleCommenting="toggleCommenting"
      v-if="isSettingsOpen && isOwnProfile"
      @onToggleCreate="onToggleCreate"
    />
    <article v-if="isCreateOpen && isOwnProfile" class="create-post-modal">
      <section class="container" @click="onToggleCreate()"></section>
      <CreateModal @onToggleCreate="onToggleCreate" :post="post" />
    </article>
  </section>
</template>

<script>
import { postService } from "../services/post.service";
import ImgSlider from "../cmps/img-slider.vue";
import UserPostSettings from "../cmps/user-post-settings.vue";
import CreateModal from "../cmps/create-modal.vue";

export default {
  data() {
    return {
      commentTxt: "",
      isSettingsOpen: false,
      isCreateOpen: false,
    };
  },
  components: { ImgSlider, UserPostSettings, CreateModal },
  props: {
    post: {
      type: Object,
      required: true,
    },
    postsLength: {
      type: Number,
      required: false,
    },
    postIndex: {
      type: Number,
      required: false,
    },
    isOwnProfile: {
      type: Boolean,
      required: false,
    },
    isAtHomePage: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    // console.log(this.post);
  },
  methods: {
    closePost() {
      this.$emit("onCloseModale");
      // this.$store.dispatch({
      //       type: 'togglePostModal',
      //       isOpen: false
      //   })
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
        if (this.$route.params._id) {
          this.$store.dispatch({
            type: "loadUserPosts",
            userId: this.$route.params._id,
          });
        } else {
          this.$store.dispatch({
            type: "loadPosts",
            user: this.loggedInUser,
          });
        }
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
        if (this.$route.params._id) {
          this.$store.dispatch({
            type: "loadUserPosts",
            userId: this.$route.params._id,
          });
        } else {
          this.$store.dispatch({
            type: "loadPosts",
            user: this.loggedInUser,
          });
        }
      } catch (err) {
        console.error("coudl'nt like this post", err);
      }
    },
    async removeLike() {
      try {
        const userId = this.loggedInUser._id;
        await postService.removeLike(this.post._id, userId);
        if (this.$route.params._id) {
          this.$store.dispatch({
            type: "loadUserPosts",
            userId: this.$route.params._id,
          });
        } else {
          this.$store.dispatch({
            type: "loadPosts",
            user: this.loggedInUser,
          });
        }
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
    onToggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    onToggleCreate() {
      if (this.isSettingsOpen) this.isSettingsOpen = false;
      this.isCreateOpen = !this.isCreateOpen;
    },
    async toggleLikes() {
      try {
        await postService.toggleLikeCount(this.post._id);
        this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.$route.params._id,
        });
      } catch (err) {
        console.error("coudl'nt do action on this post", err);
      }
    },
    async toggleCommenting() {
      try {
        await postService.toggleCommenting(this.post._id);
        this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.$route.params._id,
        });
      } catch (err) {
        console.error("coudl'nt do action on this post", err);
      }
    },
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
