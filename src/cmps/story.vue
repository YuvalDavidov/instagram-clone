<template>
  <section class="story">
    <button class="story-btn" @click="onToggleStory">
      <img :src="story.userImgUrl" class="story-user-img" />
    </button>
    <p class="story-user-name">{{ story.userId }}</p>

    <section class="story-open" v-if="isStoryOpen">
      <StorySlider :story="story" @onToggleStory="onToggleStory" />
      <section @click="onToggleStory" class="container"></section>
    </section>
  </section>
</template>

<script>
import StorySlider from "./story-slider.vue";

export default {
  data() {
    return {
      isStoryOpen: false,
    };
  },
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
  //   created() {
  //     console.log(this.story);
  //   },
  methods: {
    onToggleStory() {
      this.isStoryOpen = !this.isStoryOpen;
    },
    onNextStory() {},
  },
  components: {
    StorySlider,
  },
};
</script>

<style>
</style>