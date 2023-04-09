<template>
  <section class="stories">
    <li v-for="(story, index) in stories" :key="index" class="story-list">
      <Story
        :story="story"
        :isStoryOpen="isStoryOpen"
        :storyIndex="index"
        :selectedStoryIndex="selectedStoryIndex"
        @onToggleStory="onToggleStory"
        @onNextStory="onNextStory"
        @onPrevStory="onPrevStory"
      />
    </li>
  </section>
</template>

<script>
import { storiesService } from "../services/stories.service";
import Story from "./story.vue";

export default {
  data() {
    return {
      stories: [],
      isStoryOpen: false,
      selectedStoryIndex: 0,
    };
  },
  created() {
    this.$store.dispatch({
      type: "loadStories",
    });
  },
  methods: {
    onToggleStory(index) {
      // console.log(index, this.selectedStoryIndex);
      this.isStoryOpen = !this.isStoryOpen;
      this.selectedStoryIndex = index;
    },
    onNextStory() {
      this.selectedStoryIndex++;
    },
    onPrevStory() {
      this.selectedStoryIndex--;
    },
  },
  watch: {
    "$store.getters.getStories": {
      deep: true,
      async handler(newValue) {
        console.log(newValue);
        for (const key in newValue) {
          this.stories.push({
            userId: key,
            userImgUrl: newValue[key][0].userInfo.userImgUrl,
            stories: newValue[key],
          });
        }
      },
    },
  },
  components: {
    Story,
  },
};
</script>

<style>
</style>