<template>
  <section class="user-profile" v-if="user">
    <article class="top">
      <div class="img-container">
        <img :src="`${user.imgUrl}`" />
      </div>
      <div class="right-container">
        <div class="user-details">
          <span>{{ user.username }}</span>
          <button v-if="isOwnProfile">Edit profile</button>
          <button @click="onFollow" v-if="!isOwnProfile">{{(isFollowing) ? 'Following' : 'Follow'}}</button>
          <button v-if="!isOwnProfile">Message</button>
          <v-icon scale="1.2" name="ri-settings-5-line" />
        </div>
        <div class="user-amount">
          <div>
            <span>{{ posts.length }}</span> posts
          </div>
          <div><span>{{user.followers.length}}</span> followers</div>
          <div><span>{{user.following.length}}</span> following</div>
        </div>
        <div class="user-summery">yuval</div>
      </div>
    </article>

    <section class="actions">
      <button>psots</button>
      <button>saved</button>
      <button>tagged</button>
    </section>

    <section class="posts">
      <PostListProfile :posts="posts" v-if="posts" />
      <div class="no-posts" v-if="!posts">you have no posts</div>
    </section>
  </section>
</template>

<script>
import { userService } from "../services/user.service";
import { postService } from "../services/post.service";
import {followService} from "../services/follow.service"

import PostListProfile from "@/cmps/post-list-profile.vue";
export default {
  data() {
    return {
      user: null,
      posts: [],
      isFollowing: null
    };
  },
  async created() {
    this.user = await userService.getUserById(this.$route.params._id);
    this.posts = await postService.getUserPostsById(this.$route.params._id);
    this.isFollowing = await followService.checkIfFollowing(this.$route.params._id)
    
  },
  computed: {
    isOwnProfile() {
      if (userService.checkIfOwnProfile(this.$route.params._id)) return true
      else return false
    }
  },
  components: {
    PostListProfile,
  },
  methods: {
    async onFollow() {
      if (this.isFollowing) await followService.unFollow(this.$route.params._id)
      else await followService.addFollow(this.$route.params._id)
      this.isFollowing = !this.isFollowing
      this.user = await userService.getUserById(this.$route.params._id);
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      async handler(params) {
        // Fetch data for the new route
        this.user = await userService.getUserById(params._id);
        this.posts = await postService.getUserPostsById(params._id);
      },
    },
  }
};
</script>

<style>
</style>