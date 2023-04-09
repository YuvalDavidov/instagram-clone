<template>
  <section class="stories">
    <li v-for="(story, index) in stories" :key="index" class="story-list">
      <Story :story="story" />
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
    };
  },
  created() {
    this.$store.dispatch({
      type: "loadStories",
    });
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