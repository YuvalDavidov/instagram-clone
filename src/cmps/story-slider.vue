<template>
  <section class="story-slider">
    <div class="story-slider-num">
      <li v-for="(story, index) in story.stories" :key="story._id">
        <div class="line" :class="{ prev: index < storyNum }">
          <div :class="{ on: index === storyNum }" :id="index"></div>
        </div>
      </li>
    </div>
    <div class="story-user-info">
      <img :src="story.userImgUrl" class="user-img" />
      <p>{{ story.userId }}</p>
    </div>
    <section class="story-slider-actions">
      <button @click="onPrevStory"></button>
      <button @click="onNextStory"></button>
    </section>
    <div
      class="img-container"
      :style="{
        backgroundImage: 'url(' + story.stories[storyNum].imgUrl + ')',
      }"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      storyNum: 0,
      interval: null,
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
  },
  created() {
    // this.startInterval();
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        this.storyNum++;
        if (this.storyNum === this.story.stories.length)
          this.$emit("onToggleStory");
      }, 3000);
    },
    onNextStory() {
      clearInterval(this.interval);
      this.storyNum++;
      if (this.storyNum === this.story.stories.length) {
        this.$emit("onNextStory");
        return;
      }
      this.startInterval();
    },
    onPrevStory() {
      clearInterval(this.interval);
      this.storyNum--;
      if (this.storyNum === -1 && !this.storyIndex) this.storyNum = 0;
      else if (this.storyNum === -1 && this.storyIndex)
        this.$emit("onPrevStory");
      this.startInterval();
    },
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>

<style>
</style>