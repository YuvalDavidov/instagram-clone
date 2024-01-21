<template>
  <section class="post-modal" v-bind:class="{ isAtPostPage }">
    <div class="black-screen-settings" v-if="isSettingsOpen" @click="onToggleSettings()"></div>
    <section
      class="bg-container"
      v-if="!isAtPostPage"
      @click="closePost"
    ></section>
    <section class="post-actions-btns" v-if="!isAtHomePage && !isAtPostPage">
      <button v-if="postIndex" @click="onChangePostIndex(-1)" class="left">
        <v-icon name="md-keyboardarrowleft-round" scale="2" />
      </button>
      <button v-if="!isLastPost" @click="onChangePostIndex(1)" class="right">
        <v-icon name="md-keyboardarrowright-round" scale="2" />
      </button>
    </section>
    <section class="post" :style="modalPositionScrollY">
      <section class="post-images">
        <ImgSlider :imgsUrl="post.imgsUrl" />
      </section>
      <section class="summery-n-comments">
        <div class="summery-top">
          <header>
            <img :src="post.userImg" class="user-img" />
            <span>{{ post.username }}</span>
            <button
              @click="toggleFollowing"
              class="follow-btn-post"
              v-bind:class="{ isUserFollow: !this.isUserFollow }"
              v-if="isAtPostPage && !isOwnByUser"
            >
              {{ isUserFollow ? "Following" : "Follow" }}
            </button>
          </header>
          <button @click="onToggleSettings">
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
                  <span>{{ uploadedCommentTime(comment.timestamp) }}</span>
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
    
    
    <PostSettings
    v-if="isSettingsOpen"
    :post="post"
    :isAtPostPage="isAtPostPage"
    @onToggleSettings="onToggleSettings"
    />
    
    <article v-if="isCreateOpen && isOwnByUser" class="create-post-modal">
      <section class="container" @click="onToggleCreate()"></section>
      <CreateModal
        @onToggleCreate="onToggleCreate"
        :post="post"
        :isPost="isPost"
      />
    </article>
  </section>
</template>

<script>
import { postService } from "../services/post.service";
import { followService } from "../services/follow.service";
import ImgSlider from "../cmps/img-slider.vue";
import CreateModal from "../cmps/create-modal.vue";
import PostSettings from "../cmps/post-settings.vue";

export default {
  data() {
    return {
      commentTxt: "",
      isSettingsOpen: false,
      isCreateOpen: false,
      isPost: true,
      modalPositionScrollY: null
    };
  },
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
      required: false,
    },
    isAtPostPage: {
      type: Boolean,
      required: false,
    },
  },
  created() {
    this.modalPositionScrollY = `top: ${window.scrollY + 100}px;`
    console.log('===========>',window.scrollY)
  },
  methods: {
    closePost() {
      this.$emit("onCloseModal");
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
        let updatedPost = await postService.addComment(this.post, commentInfo);
          await this.$store.dispatch({
            type: "savePost",
            post: updatedPost,
          });
        this.commentTxt = "";
      } catch (error) {
        new Error("coudl'nt add the comment to this post", error);
      }
    },
    async addLike() {
      try {
        let updatedPost = await postService.addLike(this.post, this.loggedInUser._id);
        await this.$store.dispatch({
            type: "savePost",
            post: updatedPost,
          });
      } catch (err) {
        console.error("coudl'nt like this post", err);
      }
    },
    async removeLike() {
      try {
        const userId = this.loggedInUser._id;
       let updatedPost =  await postService.removeLike(this.post, userId);
        await this.$store.dispatch({
            type: "savePost",
            post: updatedPost,
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
    onToggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    onToggleCreate() {
      if (this.isSettingsOpen) this.isSettingsOpen = false;
      this.isCreateOpen = !this.isCreateOpen;
    },
    async toggleLikes() {
      try {
        let updatedPost = await postService.toggleLikeCount(this.post, this.post.isLikeCountVisible);
        await this.$store.dispatch({
            type: "savePost",
            post: updatedPost,
          });
      } catch (err) {
        console.error("coudl'nt do action on this post", err);
      }
    },
    async toggleCommenting() {
      try {
       let updatedPost = await postService.toggleCommenting(this.post, this.post.isCommentingAllowed);
       await this.$store.dispatch({
            type: "savePost",
            post: updatedPost,
          });
      } catch (err) {
        console.error("coudl'nt do action on this post", err);
      }
    },
    async toggleFollowing() {
      try {
        if (this.isUserFollow) await followService.unFollow(this.post.userId);
        else await followService.addFollow(this.post.userId);

        await this.$store.dispatch({
          type: "loadPost",
          postId: this.$route.params.postId,
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
      return postService.getTime(this.post.timestamp);
    },
    didUserLikedPost() {
      return postService.didUserLikedPost([...this.post.likes], this.loggedInUser._id);
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
    isOwnByUser() {
      return postService.isPostOwendByUser(this.post.userId);
    },
    isUserFollow() {
      return followService.checkIfFollowing(this.post.userId);
    },
  },
  components: { ImgSlider, CreateModal, PostSettings },
};
</script>

<!-- } else if (this.$route.params._id) {
          this.$store.dispatch({
            ,
            userId: this.$route.params._id,
          });
        } else {
          this.$store.dispatch({
            type: "loadPosts",
            userId: this.loggedInUser._id,
          });
        } -->