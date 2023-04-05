<template>
  <section class="user-post-settings">
    <button @click="removePost">delete</button>
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
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>