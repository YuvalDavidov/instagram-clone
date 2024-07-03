<template>
  
  <section class="create-modal" :class="{ second: step === 'second' }">
    <section class="first-step" v-if="step === 'first'">
      <h1 class="top">Create new {{ isPost ? "post" : "story" }}</h1>
      <div v-if="isPost" class="uploader">
        <small>Click to upload</small>
        <input
          type="file"
          className="file"
          multiple
          accept="true"
          @change="onUploadImg"
        />
      </div>
      <div v-if="!isPost" class="uploader">
        <small>Click to upload</small>
        <input
          type="file"
          className="file"
          accept="true"
          @change="onUploadImg"
        />
      </div>
    </section>

    <section class="second-step" v-if="step === 'second'">
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
          v-if="!isPost && !$store.getters.IsLoading"
          :src="postToEdit.imgsUrl"
        />
        <div v-if="isPost" :hidden="this.$store.getters.IsLoading" class="post-details">
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
import ImgSlider from "./img-slider.vue";
import { postService } from "../services/post.service";
import { storiesService } from "../services/stories.service";
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
    isPost: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    if (this.post) {
      this.step = "second";
      this.postToEdit = this.post;
      this.postToEdit.imgsUrl = Array.prototype.slice.call(this.post.imgsUrl);
    } else this.postToEdit = postService.getEmptyPost();
  },
  methods: {
     async onUploadImg(ev) {
      await this.$store.dispatch({type: 'toggleLoader'})
      console.log(ev);

      if (this.isPost) {
      uploadService.uploadMany(ev).then((imgsUrl) => {
          this.postToEdit.imgsUrl = imgsUrl.map((img) => img.url);
          this.$store.dispatch({type: 'toggleLoader'})
        });
      } else {
       uploadService.uploadImg(ev).then((imgsUrl) => {
         this.postToEdit.imgsUrl = imgsUrl.url;
         this.$store.dispatch({type: 'toggleLoader'})
        });
      }
      this.step = "second";

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
          const postToSave = await postService.savePost(this.user, this.postToEdit);
          this.$store.dispatch({ type: "addPost", post: postToSave, isAtProfile: (this.$route.params._id && this.$route.params._id === this.user._id) ? true : false})
        } else {
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