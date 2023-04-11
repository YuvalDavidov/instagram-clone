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
        <button @click="onBack()" class="back btn">
          {{ postToEdit._id ? "Cancel" : "Back" }}
        </button>
        <span> {{ postToEdit._id ? "Edit post" : "Create new post" }}</span>
        <button @click="onPost()" class="share btn">
          {{ postToEdit._id ? "Update" : "Share" }}
        </button>
      </div>
      <section class="bottom">
        <ImgSlider :imgsUrl="postToEdit.imgsUrl" />
        <div class="post-details">
          <section class="user">
            <span><img :src="user.imgUrl" /></span>
            <span class="user-name"> {{ user.username }} </span>
          </section>
          <textarea
            v-model="postToEdit.summery"
            class="textarea-summery"
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
import { postService } from "../services/post.service";
export default {
  data() {
    return {
      postToEdit: null,
      step: "first",
      user: this.$store.getters.GetUser,
    };
  },
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  created() {
    if (this.post) {
      this.step = "seconde";
      this.postToEdit = this.post;
      this.postToEdit.imgsUrl = Array.prototype.slice.call(this.post.imgsUrl);
    } else this.postToEdit = postService.getEmptyPost();
  },
  methods: {
    onUploadImg(ev) {
      console.log(ev);
      uploadService.uploadMany(ev).then((imgsUrl) => {
        this.postToEdit.imgsUrl = imgsUrl.map((img) => img.url);
      });
      this.step = "seconde";
    },
    onBack() {
      if (this.postToEdit._id) this.$emit("onToggleCreate");
      else {
        this.step = "first";
        this.postToEdit.imgsUrl = [];
      }
    },
    onSummeryChange(ev) {
      this.postToEdit.summery = ev.target.value;
    },
    async onPost() {
      try {
        const postToSave = await postService.savePost(
          this.user,
          this.postToEdit
        );
        this.$emit("onToggleCreate");
        this.$store.dispatch({
          type: "savePost",
          post: postToSave,
        });
      } catch (error) {
        new Error("coudl'nt create this post", error);
      }
    },
  },
  components: {
    ImgSlider,
  },
};
</script>

<style>
</style>