<template>
    <article class="post-details-home">
        <div class="post-details-header">
            <img class="user-img" :src="post.userImg">
            <span>{{ post.username }}</span>
            </div>
        <img class="post-img" :src="post.imgsUrl[0]" >
        <div class="post-actions">
        <nav class="actions-nav">
          <button class="action-icon">
            <v-icon
                  scale="1.2"
                  name="bi-heart"
                  @click="addLike()"
                  v-if="!didUserLikedPost(post)"
                />
                <v-icon
                  scale="1.2"
                  fill="red"
                  name="bi-heart-fill"
                  @click="removeLike()"
                  v-if="didUserLikedPost(post)"
                />
          </button>
          <button class="action-icon comment" @click="onOpenPostModal">
            <v-icon scale="1.2" name="bi-chat" flip="horizontal" />
          </button>
        </nav>
        <span>{{ post.likes.length }} likes</span>
        <div>
          <span class="username">{{ post.username}}</span>
          <span class="space"></span>
          <span class="summery">{{ post.summery }}</span>
        </div>
        <button @click="onOpenPostModal()" v-if="post.comments.length">
          View all {{ post.comments.length }} comments
        </button>
        <span class="time-span">{{ timeAgo(post.timeStamp) }} </span>
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
    </article>
   
</template>

<script>
import { postService } from '../services/post.service';
export default {
  data() {
    return {
      commentTxt: "",
    }
  },
    props: {
        post: {
            type: Object,
            required: true
        },
       
    },
    methods: {
    timeAgo(timestamp) {
      return postService.getTime(timestamp);
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
            type: "loadPosts",
            user: this.loggedInUser,
          });
      } catch (error) {
        new Error("coudl'nt add the comment to this post", error);
      }
      this.commentTxt = "";
    },
    onOpenPostModal() {
      console.log('ho')
        this.$emit('onOpenPostModal')
    },
    async removeLike() {
      try {
        const userId = this.loggedInUser._id;
        await postService.removeLike(this.post._id, userId);
        this.$store.dispatch({
          type: "loadPosts",
          user: this.loggedInUser,
        });
      } catch (err) {
        throw new Error("coudl'nt remove like from this post", err);
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
          type: "loadPosts",
          user: this.loggedInUser,
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
    
  },
  created() {
    console.log(this.isOwnProfile)
    if (!this.$route.params._id) console.log(this.$route.params)
  }
}
</script>

<style>

</style>