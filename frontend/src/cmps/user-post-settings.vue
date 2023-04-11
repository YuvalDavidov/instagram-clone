<template>
  <section class="user-post-settings">
    <section class="container" @click="onClose"></section>
    <section class="post-settings-modal">
      <button @click="removePost" style="color: red; font-weight: bold">
        Delete
      </button>
      <button @click="onEdit">Edit</button>
      <button @click="onToggleLikes">
        {{ post.isLikeCountVisible ? "Hide like count" : "Unhide like count" }}
      </button>
      <button @click="onToggleComminting">
        {{
          post.isCommentingAllowed
            ? " Turn off commenting"
            : " Turn on commenting"
        }}
      </button>
      <button>Go to post</button>
      <button>Share to...</button>
      <button>Copy link</button>
      <button @click="onClose">Cancel</button>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removePost() {
      try {
        this.$store.dispatch({
          type: "removePost",
          postId: this.post._id,
        });
        this.$emit("closePost");
      } catch (error) {
        new Error("coudl'nt remove this post", error);
      }
    },
    onClose() {
      this.$emit("onToggleSettings");
    },
    onEdit() {
      this.$emit("onToggleCreate");
    },
    onToggleLikes() {
      this.$emit("toggleLikes");
      this.$emit("onToggleSettings");
    },
    onToggleComminting() {
      this.$emit("toggleCommenting");
      this.$emit("onToggleSettings");
    },
  },
};
</script>

<style>
</style>