<template>
  <section class="user-post-preview">
    <section class="container" @click="closePost"></section>
    <section class="post">
      <section class="post-images">
        <ImgSlider :imgsUrl="post.imgsUrl" />
      </section>
      <section class="summery-n-comments">
        <div class="summery-top">
          <header>
            <img :src="user.imgUrl" class="user-img" />
            <span>{{ user.username }}</span>
          </header>
          <button>...</button>
        </div>
        <div class="comments">
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
          <span>asdfasdf</span>
        </div>
        <section class="add-comment">
          <div class="actions-btns">
            <section>
              <button @click="addLike()">like</button>
              <button>comment</button>
              <button>send</button>
            </section>
            <button>save</button>
          </div>
          <span> {{ post.likes.length }} likes</span>
          <small>2 HOURS AGO</small>

          <section class="input-actions">
            <input
              v-model="commentTxt"
              type="text"
              class="comment-input"
              placeholder="comment..."
            />
            <a @click="addComment()" :class="{ active: commentTxt.length >= 1 }"
              >post</a
            >
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import ImgSlider from "./img-slider.vue";
export default {
  data() {
    return {
      commentTxt: "",
    };
  },
  components: { ImgSlider },
  props: {
    post: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePost() {
      this.$emit("onClosePost");
    },
    addComment() {
      if (this.commentTxt.length < 1) return;
    },
    addLike() {
      console.log(this.post);
    },
  },
};
</script>

<style>
</style>