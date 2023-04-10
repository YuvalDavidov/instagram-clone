<template>
  <section class="stories">
    <li v-for="(story, index) in stories" :key="index" class="story-list">
      <Story :story="story" />
    </li>
  </section>
</template>

<script>
import { storiesService } from "../services/stories.service";
import { userService } from "../services/user.service";
import Story from "./story.vue";

export default {
  data() {
    return {
      stories: [],
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
        this.stories = newValue;
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