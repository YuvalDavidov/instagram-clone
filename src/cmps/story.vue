<template>
  <section class="story" v-if="user">
    <button class="story-btn" @click="onToggleStory">
      <img :src="user.imgUrl" class="story-user-img" />
    </button>
    <p class="story-user-name">{{ user.username }}</p>

    <!-- <section class="story-open" v-if="isStoryOpen && isStorySelected">
      <StorySlider
        :story="story"
        :storyIndex="storyIndex"
        @onToggleStory="onToggleStory"
        @onNextStory="onNextStory"
        @onPrevStory="onPrevStory"
      />
      <section @click="onToggleStory" class="container"></section>
    </section> -->
  </section>
</template>

<script>
import { storiesService } from "../services/stories.service";
import { userService } from "../services/user.service";
import StorySlider from "./story-slider.vue";

export default {
  data() {
    return {
      user: null,
      stories: null,
    };
  },
  props: {
    story: {
      type: String,
      required: true,
    },
  },
  async created() {
    // this.user = await userService.getUserById(this.story);
  },
  methods: {
    onToggleStory() {
      // this.$router.push(`/stories/${this.$route.params._id}`);
    },
    // onNextStory() {
    //   this.$emit("onNextStory");
    // },
    // onPrevStory() {
    //   this.$emit("onPrevStory");
    // },
  },
  computed: {
    // isStorySelected() {
    //   if (this.selectedStoryIndex === this.storyIndex) return true;
    //   else return false;
    // },
  },
  components: {
    StorySlider,
  },
};
</script>

<style>
</style>