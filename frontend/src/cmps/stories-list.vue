<template>
  <section class="stories">
    <li v-for="(story, index) in stories" :key="index" class="story-list">
      <Story :story="story" />
    </li>
  </section>
</template>

<script>
import Story from "./story.vue";

export default {
  data() {
    return {
      stories: [],
    };
  },
  created() {
    this.$store.dispatch({type: "loadStories"})
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