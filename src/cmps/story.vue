<template>
  <section class="story">
    <button class="story-btn" @click="onToggleStory">
      <img :src="story.userImgUrl" class="story-user-img" />
    </button>
    <p class="story-user-name">{{ story.userId }}</p>

    <section class="story-open" v-if="isStoryOpen && isStorySelected">
      <StorySlider
        :story="story"
        :storyIndex="storyIndex"
        @onToggleStory="onToggleStory"
        @onNextStory="onNextStory"
        @onPrevStory="onPrevStory"
      />
      <section @click="onToggleStory" class="container"></section>
    </section>
  </section>
</template>

<script>
import StorySlider from "./story-slider.vue";

export default {
  data() {
    return {
      // isStorySelected: false,
    };
  },
  props: {
    story: {
      type: Object,
      required: true,
    },
    storyIndex: {
      type: Number,
      required: true,
    },
    selectedStoryIndex: {
      type: Number,
      required: true,
    },
    isStoryOpen: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    // console.log(this.storyIndex, this.selectedStoryIndex);
  },
  methods: {
    onToggleStory() {
      this.$emit("onToggleStory", this.storyIndex);
    },
    onNextStory() {
      this.$emit("onNextStory");
    },
    onPrevStory() {
      this.$emit("onPrevStory");
    },
  },
  computed: {
    isStorySelected() {
      if (this.selectedStoryIndex === this.storyIndex) return true;
      else return false;
    },
  },
  components: {
    StorySlider,
  },
};
</script>

<style>
</style>