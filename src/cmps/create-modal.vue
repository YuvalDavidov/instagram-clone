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
    </section>
  </section>
</template>

<script>
import { uploadService } from "../services/upload.service";
export default {
  data() {
    return {
      imgsUrl: [],
      step: "first",
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
};
</script>

<style>
</style>