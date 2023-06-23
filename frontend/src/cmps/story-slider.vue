<template>
  <section v-if="story" class="story-slider">
    <section @click="onBack" class="bg-container"></section>
    <section class="story-slider-contaienr">
      <section v-if="isOnInput" @click="onCloseInput" class="onInput"></section>
      <div class="story-slider-num">
        <li v-for="(story, index) in stories" :key="story">
          <div class="line" :class="{ prev: index < storyIndex }">
            <div
              :class="{
                on: index === storyIndex,
              }"
              :style="`width: ${timeLeft}%`"
              :id="index"
            ></div>
          </div>
        </li>
      </div>
      <div class="story-user-info">
        <img :src="story.userInfo.userImgUrl" class="user-img" />
        <p>{{ story.userInfo.username }}</p>
        <p>{{ timeAgo }}</p>
        <button
          class="interval-btn"
          v-if="isIntervalStoped"
          @click="toggleIntrval"
        >
          <v-icon scale="1" name="fa-play" />
        </button>
        <button
          class="interval-btn"
          v-if="!isIntervalStoped"
          @click="toggleIntrval"
        >
          <v-icon scale="1" name="gi-pause-button" />
        </button>
      </div>
      <section class="story-slider-actions">
        <button
          v-if="storyIndex || isAtHome"
          class="left-btn"
          @click="onPrevStory"
        >
          <v-icon name="md-keyboardarrowleft-round" scale="1" />
        </button>
        <button class="right-btn" @click="onNextStory">
          <v-icon name="md-keyboardarrowright-round" scale="1" />
        </button>
      </section>
      <img class="img-container" :src="story.imgUrl" />
      <section class="comment-likes">
        <input
          @click="onOpenInput"
          type="text"
          :placeholder="'replay to ' + story.userInfo.username"
          v-model="commentTxt"
        />
        <button class="send" v-if="canComment">send</button>
        <button><v-icon name="bi-heart" scale="1.5" /></button>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stories: [],
      interval: null,
      story: null,
      isAtHome: false,
      intervalTime: 6,
      timeLeft: 0,
      isIntervalStoped: false,
      isOnInput: false,
      commentTxt: "",
    };
  },
  async created() {
    if (!this.$route.path.includes("profile")) this.isAtHome = !this.isAtHome;
    await this.$store.dispatch({
      type: "loadUserStories",
      userId: this.$route.params._id,
    });
    await this.$store.dispatch({
      type: "loadStory",
      storyId: this.$route.params.storyId,
    });
    this.startInterval();
  },
  methods: {
    startInterval() {
      this.isIntervalStoped = false;
      this.interval = setInterval(() => {
        this.intervalTime -= 0.1;
        this.timeLeft = ((6 - this.intervalTime) / 6) * 100;
        if (this.intervalTime <= 0 && this.timeLeft > 100) this.onNextStory();
      }, 100);
    },
    async onNextStory() {
      clearInterval(this.interval);
      if (!this.isAtHome) {
        if (this.storyIndex + 1 === this.stories.length) {
          this.$router.push(`/profile/${this.$route.params._id}`);
        } else {
          this.$router.push(
            `/stories/profile/${this.$route.params._id}/${
              this.stories[this.storyIndex + 1]
            }`
          );
        }
      } else {
        if (this.storyIndex + 1 === this.stories.length) {
          const idx = this.usersStory.findIndex(
            (userId) => userId === this.$route.params._id
          );
          if (idx + 2 === this.usersStory.length) {
            this.$router.push("/");
          } else {
            await this.$store.dispatch({
              type: "loadUserStories",
              userId: this.usersStory[idx + 1],
            });
            this.$router.push(
              `/stories/${this.usersStory[idx + 1]}/${this.stories[0]}`
            );
          }
        } else {
          this.$router.push(
            `/stories/${this.$route.params._id}/${
              this.stories[this.storyIndex + 1]
            }`
          );
        }
      }
      this.intervalTime = 6;
      this.timeLeft = 0;
      this.startInterval();
    },
    async onPrevStory() {
      clearInterval(this.interval);
      if (!this.isAtHome) {
        this.$router.push(
          `/stories/profile/${this.$route.params._id}/${
            this.stories[this.storyIndex - 1]
          }`
        );
      } else {
        if (!this.storyIndex) {
          const idx = this.usersStory.findIndex(
            (userId) => userId === this.$route.params._id
          );
          if (!idx && !this.storyIndex) {
            this.$router.push("/");
          } else {
            await this.$store.dispatch({
              type: "loadUserStories",
              userId: this.usersStory[idx - 1],
            });
            this.$router.push(
              `/stories/${this.usersStory[idx - 1]}/${
                this.stories[this.stories.length - 1]
              }`
            );
          }
        } else {
          this.$router.push(
            `/stories/${this.$route.params._id}/${
              this.stories[this.storyIndex - 1]
            }`
          );
        }
      }
      this.intervalTime = 6;
      this.timeLeft = 0;
      this.startInterval();
    },
    onBack() {
      if (!this.isAtHome) {
        this.$router.push(`/profile/${this.$route.params._id}`);
      } else {
        this.$router.push(`/`);
      }
    },
    toggleIntrval() {
      if (!this.isIntervalStoped) {
        this.isIntervalStoped = !this.isIntervalStoped;
        clearInterval(this.interval);
      } else {
        this.isIntervalStoped = !this.isIntervalStoped;
        this.startInterval();
      }
    },
    onOpenInput() {
      this.isIntervalStoped = false;
      this.isOnInput = true;
      clearInterval(this.interval);
    },
    onCloseInput() {
      this.isIntervalStoped = true;
      this.isOnInput = false;
      this.startInterval();
    },
  },
  unmounted() {
    clearInterval(this.interval);
  },
  computed: {
    storyIndex() {
      return this.stories.findIndex((storyId) => storyId === this.story._id);
    },
    usersStory() {
      return this.$store.getters.getStories;
    },
    canComment() {
      if (this.commentTxt.length) return true;
      else return false;
    },
    timeAgo() {
      let now = new Date().getTime();
      let storyTime = new Date(this.story.createdAt).getTime();
      let diff = (now - storyTime) / 1000;
      diff /= 60 * 60;
      let houserDiff = Math.abs(Math.round(diff));
      if (!houserDiff) {
        diff *= 60;
        let minDiff = Math.abs(Math.round(diff));
        return minDiff + "m";
      }
      return houserDiff + "h";
    },
  },
  watch: {
    "$route.params": {
      async handler(params) {
        this.$store.dispatch({
          type: "loadStory",
          storyId: params.storyId,
        });
        // console.log(this.story);
      },
    },
    "$store.getters.getUserStories": {
      deep: true,
      async handler(newValue) {
        this.stories = newValue;
      },
    },
    "$store.getters.getStory": {
      deep: true,
      async handler(newValue) {
        this.story = newValue;
      },
    },
  },
};
</script>

<style>
</style>