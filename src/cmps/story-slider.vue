<template>
  <section v-if="story" class="story-slider">
    <section @click="backToProfile" class="container"></section>
    <section class="story-slider-contaienr">
      <div class="story-slider-num">
        <li v-for="(story, index) in stories" :key="story">
          <div class="line" :class="{ prev: index < storyIndex }">
            <div :class="{ on: index === storyIndex }" :id="index"></div>
          </div>
        </li>
      </div>
      <div class="story-user-info">
        <img :src="story.userInfo.userImgUrl" class="user-img" />
        <p>{{ story.userInfo.userId }}</p>
      </div>
      <section class="story-slider-actions">
        <button v-if="storyIndex" class="left-btn" @click="onPrevStory">
          <v-icon name="md-keyboardarrowleft-round" scale="1" />
        </button>
        <button class="right-btn" @click="onNextStory">
          <v-icon name="md-keyboardarrowright-round" scale="1" />
        </button>
      </section>
      <img class="img-container" :src="story.imgUrl" />
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stories: [],
      storyNum: 0,
      interval: null,
      story: null,
    };
  },
  created() {
    console.log(this.$route.params);
    this.$store.dispatch({
      type: "loadUserStories",
      userId: this.$route.params._id,
    });
    this.$store.dispatch({
      type: "loadStory",
      storyId: this.$route.params.storyId,
    });
    this.startInterval();
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        if (this.storyIndex + 1 === this.stories.length) {
          this.$router.push(`/profile/${this.$route.params._id}`);
        } else {
          this.$router.push(
            `/stories/${this.$route.params._id}/${
              this.stories[this.storyIndex + 1]
            }`
          );
        }
      }, 3000);
    },
    onNextStory() {
      clearInterval(this.interval);
      if (this.storyIndex + 1 === this.stories.length) {
        this.$router.push(`/profile/${this.$route.params._id}`);
      } else {
        this.$router.push(
          `/stories/${this.$route.params._id}/${
            this.stories[this.storyIndex + 1]
          }`
        );
      }
      this.startInterval();
    },
    onPrevStory() {
      clearInterval(this.interval);
      this.$router.push(
        `/stories/${this.$route.params._id}/${
          this.stories[this.storyIndex - 1]
        }`
      );
      this.startInterval();
    },
    backToProfile() {
      this.$router.push(`/profile/${this.$route.params._id}`);
    },
  },
  unmounted() {
    clearInterval(this.interval);
  },
  computed: {
    storyIndex() {
      return this.stories.findIndex((storyId) => storyId === this.story._id);
    },
  },
  watch: {
    "$route.params": {
      async handler(params) {
        this.$store.dispatch({
          type: "loadUserStories",
          userId: this.$route.params._id,
        });
        this.$store.dispatch({
          type: "loadStory",
          storyId: this.$route.params.storyId,
        });
      },
    },
    "$store.getters.getUserStories": {
      deep: true,
      async handler(newValue) {
        // console.log(newValue);
        this.stories = newValue;
        // console.log(this.story);
      },
    },
    "$store.getters.getStory": {
      deep: true,
      async handler(newValue) {
        // console.log(newValue);
        this.story = newValue;
        // console.log(this.story);
      },
    },
  },
};
</script>

<style>
</style>