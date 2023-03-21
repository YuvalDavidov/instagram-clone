<template>
  <section class="create-modal" :class="{ seconde: step === 'seconde' }">
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
        <button @click="onPost()">Share</button>
      </div>
      <section class="bottom">
        <ImgSlider :imgsUrl="imgsUrl" />
        <div class="post-details">
          <section class="user">
            <span><img :src="user.imgUrl" /></span>
            <span class="user-name"> {{ user.username }} </span>
          </section>
          <textarea
            name="post-summery"
            id=""
            rows="10"
            placeholder="Write a caption..."
            @change="onSummeryChange"
          ></textarea>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { uploadService } from "../services/upload.service";

import ImgSlider from "@/cmps/img-slider.vue";
import { userService } from "../services/user.service";
import { postService } from "../services/post.service";
export default {
  data() {
    return {
      imgsUrl: [
        "https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg",
        "https://res.cloudinary.com/dp32ucj0y/image/upload/v1674918908/cgsfbltc4pczqaqnciet.jpg",
      ],
      step: "seconde",
      user: userService.getLoggedinUser(),
      postSummery: "",
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
    onSummeryChange(ev) {
      this.postSummery = ev.target.value;
    },
    onPost() {
      postService.createPost(this.user._id, this.imgsUrl, this.postSummery);
      this.$emit("onToggleCreate");
    },
  },
  components: {
    ImgSlider,
  },
};
</script>

<style>
</style>