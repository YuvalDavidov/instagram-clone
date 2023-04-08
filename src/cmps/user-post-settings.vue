<template>
  <section class="user-post-settings">
    <section class="container" @click="onClose"></section>
    <section class="post-settings-modal">
      <button @click="removePost" style="color: red; font-weight: bold">
        Delete
      </button>
      <button @click="onEdit">Edit</button>
      <button>Hide like count</button>
      <button>Turn off commenting</button>
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
  },
};
</script>

<style>
</style>