<template>
  <section
    class="user-profile"
    :class="{ mobile: this.isMobileMode }"
    v-if="user"
  >
    <article v-if="!this.isMobileMode" class="top">
      <div class="img-container">
        <button
          @click="onGoToUserStories"
          :class="{ 'story-btn': userStories }"
        >
          <img :src="`${user.imgUrl}`" />
        </button>
      </div>
      <div class="right-container">
        <div class="user-details">
          <span>{{ user.username }}</span>
          <button v-if="isOwnProfile">Edit profile</button>
          <button @click="onFollow" v-if="!isOwnProfile">
            {{ isFollowing ? "Following" : "Follow" }}
          </button>
          <button v-if="!isOwnProfile">Message</button>
          <v-icon scale="1.2" name="ri-settings-5-line" />
        </div>
        <div class="user-amount">
          <div>
            <span>{{ posts.length }}</span> posts
          </div>
          <div>
            <span>{{ user.followers.length }}</span> followers
          </div>
          <div>
            <span>{{ user.following.length }}</span> following
          </div>
        </div>
        <div class="user-summery">yuval</div>
      </div>
    </article>
    <article v-if="this.isMobileMode" class="top mobile">
      <div class="flex">
        <div class="img-container">
          <button
            @click="onGoToUserStories"
            :class="{ 'story-btn': userStories }"
          >
            <img :src="`${user.imgUrl}`" />
          </button>
        </div>
        <div class="right-container">
          <div class="user-details">
            <span>{{ user.username }}</span>

            <button @click="onFollow" v-if="!isOwnProfile">
              {{ isFollowing ? "Following" : "Follow" }}
            </button>
            <button v-if="!isOwnProfile">Message</button>
            <v-icon scale="1.2" name="ri-settings-5-line" />
          </div>
          <button v-if="isOwnProfile">Edit profile</button>
        </div>
      </div>
      <div class="user-summery">{{ user.fullname }}</div>
    </article>
    <div v-if="this.isMobileMode" class="user-amount mobile">
      <div>
        <span>{{ posts.length }}</span> posts
      </div>
      <div>
        <span>{{ user.followers.length }}</span> followers
      </div>
      <div>
        <span>{{ user.following.length }}</span> following
      </div>
    </div>
    <section class="actions">
      <button>psots</button>
      <button>saved</button>
      <button>tagged</button>
    </section>

    <section class="posts">
      <PostListProfile
        :posts="posts"
        :user="user"
        :isOwnProfile="isOwnProfile"
        v-if="posts.length"
      />
      <div class="no-posts" v-if="!posts">you have no posts</div>
    </section>
  </section>
</template>

<script>
import { userService } from "../services/user.service";
import { followService } from "../services/follow.service";

import PostListProfile from "../cmps/post-list-profile.vue";
export default {
  data() {
    return {
      user: null,
      isFollowing: null,
      posts: [],
    };
  },
  async created() {
    this.user = await userService.getUserById(this.$route.params._id);
    this.isFollowing = await followService.checkIfFollowing(
      this.$route.params._id
    );
    this.$store.dispatch({
      type: "loadUserStories",
      userId: this.$route.params._id,
    });
  },
  methods: {
    async onFollow() {
      try {
        if (this.isFollowing)
          await followService.unFollow(this.$route.params._id);
        else await followService.addFollow(this.$route.params._id);
        this.isFollowing = !this.isFollowing;
        this.user = await userService.getUserById(this.$route.params._id);
      } catch (err) {
        console.error(err);
      }
    },
    onGoToUserStories() {
      if (!this.userStories) return;
      this.$router.push(
        `/stories/profile/${this.$route.params._id}/${this.userStories}`
      );
    },
  },
  computed: {
    isOwnProfile() {
      if (userService.checkIfOwnByUser(this.$route.params._id)) return true;
      else return false;
    },
    userStories() {
      return this.$store.getters.getUserStories[0];
    },
    windowMode() {
      return this.$store.getters.GetWindowMode;
    },
    isMobileMode() {
      if (this.windowMode === "isMobileMode") return true;
      else return false;
    },
  },

  watch: {
    "$route.params": {
      immediate: true,
      async handler(params) {
        // Fetch data for the new route
        this.user = await userService.getUserById(params._id);
        this.$store.dispatch({
          type: "loadUserPosts",
          userId: this.$route.params._id,
        });
      },
    },
    "$store.getters.userPosts": {
      deep: true,
      async handler(newValue) {
        this.posts = newValue;
      },
    },
  },
  components: {
    PostListProfile,
  },
};
</script>

<style>
</style>