<template>
  <section class="create-modal" :class="{ seconde: step === 'seconde' }">
    <section class="first-step" v-if="step === 'first'">
      <h1 class="top">Create new {{ isPost ? "post" : "story" }}</h1>
      <div v-if="isPost" class="uploader">
        <small>Drag pictures of click to upload</small>
        <input
          type="file"
          className="file"
          multiple
          accept="true"
          @change="onUploadImg"
        />
      </div>
      <div v-if="!isPost" class="uploader">
        <small>Drag pictures of click to upload</small>
        <input
          type="file"
          className="file"
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
        <span>
          {{
            isPost
              ? postToEdit._id
                ? "Edit post"
                : "Create new post"
              : "Create new story"
          }}
        </span>
        <button @click="onPost()" class="share btn">
          {{ postToEdit._id ? "Update" : "Share" }}
        </button>
      </div>
      <section class="bottom">
        <ImgSlider v-if="isPost" :imgsUrl="postToEdit.imgsUrl" />
        <img
          class="story-img-create"
          v-if="!isPost"
          :src="postToEdit.imgsUrl"
        />
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
import { storiesService } from "../services/stories.service";
export default {
  data() {
    return {
      postToEdit: null,
      step: "first",
      user: this.$store.getters.GetUser,
      myCanvas: null,
    };
  },
  props: {
    post: {
      type: Object,
      required: false,
    },
    isPost: {
      type: Boolean,
      required: true,
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

      if (this.isPost) {
        uploadService.uploadMany(ev).then((imgsUrl) => {
          this.postToEdit.imgsUrl = imgsUrl.map((img) => img.url);
        });
      } else {
        console.log("gi");
        uploadService.uploadImg(ev).then((imgsUrl) => {
          this.postToEdit.imgsUrl = imgsUrl.url;
        });
      }
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
        if (this.isPost) {
          const postToSave = await postService.savePost(
            this.user,
            this.postToEdit
          );
          this.$store.dispatch({
            type: "savePost",
            post: postToSave,
          });
        } else {
          console.log("sdfasd");
          const storyToSave = await storiesService.createStory(
            this.postToEdit.imgsUrl
          );
        }
        this.$emit("onToggleCreate");
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