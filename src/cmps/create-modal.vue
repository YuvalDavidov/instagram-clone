<template>
  <section class="create-modal">
    <section class="first-step" v-if="step === 'first'">
      <h1 class="top">Create new post</h1>
      <div class="uploader">
        <small>Drag pictures of click to upload</small>
        <input
          type="file"
          className="file"
          multiple
          accept="true"
          @change="onUploadImg"
        />
      </div>
    </section>

    <section class="seconde-step" v-if="step === 'seconde'">
      <div class="top">
        <button @click="onBack()" class="back-btn">back</button>
        <span>Create new post</span>
        <button>Share</button>
      </div>
      <ImgSlider :imgsUrl="imgsUrl" />
    </section>
  </section>
</template>

<script>
import { uploadService } from "../services/upload.service";

import ImgSlider from "@/cmps/img-slider.vue";
export default {
  data() {
    return {
      imgsUrl: [
        "https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg",
        "https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg",
      ],
      step: "seconde",
    };
  },
  methods: {
    onUploadImg(ev) {
      console.log(ev);
      uploadService.uploadMany(ev).then((imgsUrl) => {
        this.imgsUrl = imgsUrl.map((img) => img.url);
      });
      this.step = "seconde";
    },
    onBack() {
      this.step = "first";
      this.imgsUrl = [];
    },
  },
  components: {
    ImgSlider,
  },
};
</script>

<style>
</style>