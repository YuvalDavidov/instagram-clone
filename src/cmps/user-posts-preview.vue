<template>
  <section class="user-post-preview">
    <section class="container" @click="closePost"></section>
    <section class="post">
      <section class="left">
        <ImgSlider :imgsUrl="post.imgsUrl" />
      </section>
    </section>
  </section>
</template>

<script>
import ImgSlider from "./img-slider.vue";
export default {
  components: { ImgSlider },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePost() {
      this.$emit("onClosePost");
    },
  },
};
</script>

<style>
</style>