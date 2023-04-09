<template>
  <section class="story">
    <img :src="story.userImgUrl" class="story-user-img" />
  </section>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.story);
  },
};
</script>

<style>
</style>