<template>
  <section class="user-post-settings">
    <section class="post-settings-modal" v-bind:class="{ isAtPostPage }">
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
      <button @click="onMoveToPost" v-if="!isAtPostPage">Go to post</button>
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
    isAtPostPage: {
      type: Boolean,
      required: false,
    },
    // closePost: {
    //   type: Function,
    //   required: true
    // }
  },
  methods: {
    async removePost() {
      try {
        this.$store.dispatch({type: 'toggleLoader'})
        await this.$store.dispatch({ type: "removePost", postId: this.post._id})
        this.$emit("closePost");
        setTimeout(()=>this.$store.dispatch({type: 'toggleLoader'}), 500)
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
    onMoveToPost() {
      this.$emit("onMoveToPost");
    },
  },
};
</script>

<style>
</style>